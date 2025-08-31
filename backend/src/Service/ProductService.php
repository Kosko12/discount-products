<?php

namespace App\Service;

use App\Entity\DiscountRule;
use App\Entity\Product;
use App\Service\FinalPriceCalculator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ProductService
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ValidatorInterface $validator,
        private FinalPriceCalculator $priceCalculator
    ) {
    }

    /**
     * @return array
     */
    public function getProducts(?string $category = null, string $sort = 'asc'): array
    {
        $repository = $this->entityManager->getRepository(Product::class);
        $queryBuilder = $repository->createQueryBuilder('p');

        // Filter by category
        if ($category) {
            $queryBuilder->andWhere('p.category = :category')
                ->setParameter('category', $category);
        }

        // Sort by price
        if (in_array($sort, ['asc', 'desc'])) {
            $queryBuilder->orderBy('p.priceGross', $sort);
        }

        $products = $queryBuilder->getQuery()->getResult();

        return array_map([$this, 'formatProductData'], $products);
    }

    /**
     * @param array $data
     * @return array{product: Product, errors: array}
     */
    public function createProduct(array $data): array
    {
        $product = new Product();
        $product->setName($data['name'] ?? '')
            ->setCategory($data['category'] ?? '')
            ->setPriceGross($data['priceGross'] ?? '0')
            ->setCurrency($data['currency'] ?? 'PLN');

        if (isset($data['externalId']) && !empty(trim($data['externalId']))) {
            $product->setExternalId(trim($data['externalId']));
        }

        $errors = $this->validator->validate($product);

        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return ['product' => null, 'errors' => $errorMessages];
        }

        $this->entityManager->persist($product);
        $this->entityManager->flush();

        return ['product' => $product, 'errors' => []];
    }

    /**
     * @param int $productId
     * @return array|null
     */
    public function getProductPrice(int $productId): ?array
    {
        $product = $this->entityManager->getRepository(Product::class)->find($productId);

        if (!$product) {
            return null;
        }

        // For demo purposes, let's get the first available discount rule
        $discountRule = $this->entityManager->getRepository(DiscountRule::class)->findOneBy([]);

        $finalPrice = $this->priceCalculator->calculateFinalPrice($product, $discountRule);

        return [
            'productId' => $product->getId(),
            'originalPrice' => $product->getPriceGross(),
            'finalPrice' => $finalPrice,
            'currency' => $product->getCurrency(),
            'discountApplied' => $discountRule !== null,
            'discountType' => $discountRule?->getType(),
            'discountValue' => $discountRule?->getValue(),
        ];
    }

    /**
     * @param int $productId
     * @return Product|null
     */
    public function findProduct(int $productId): ?Product
    {
        return $this->entityManager->getRepository(Product::class)->find($productId);
    }

    /**
     * Format product entity to array
     */
    private function formatProductData(Product $product): array
    {
        return [
            'id' => $product->getId(),
            'externalId' => $product->getExternalId(),
            'name' => $product->getName(),
            'category' => $product->getCategory(),
            'priceGross' => $product->getPriceGross(),
            'currency' => $product->getCurrency(),
            'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
        ];
    }
}
