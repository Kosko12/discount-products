<?php

namespace App\Controller;

use App\Service\ProductService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/products')]
class ProductController extends AbstractController
{
    public function __construct(
        private ProductService $productService
    ) {
    }

    #[Route('', name: 'products_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        $category = $request->query->get('category');
        $sortDirection = $request->query->get('sort', 'asc');

        $products = $this->productService->getProducts($category, $sortDirection);

        return new JsonResponse($products);
    }

    #[Route('', name: 'products_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return new JsonResponse(['error' => 'Invalid JSON'], Response::HTTP_BAD_REQUEST);
        }

        $result = $this->productService->createProduct($data);

        if (!empty($result['errors'])) {
            return new JsonResponse(['errors' => $result['errors']], Response::HTTP_BAD_REQUEST);
        }

        $product = $result['product'];
        
        return new JsonResponse([
            'id' => $product->getId(),
            'externalId' => $product->getExternalId(),
            'name' => $product->getName(),
            'category' => $product->getCategory(),
            'priceGross' => $product->getPriceGross(),
            'currency' => $product->getCurrency(),
            'createdAt' => $product->getCreatedAt()->format('Y-m-d H:i:s'),
        ], Response::HTTP_CREATED);
    }

    #[Route('/{id}/price', name: 'product_price', methods: ['GET'])]
    public function getPrice(int $id): JsonResponse
    {
        $priceData = $this->productService->getProductPrice($id);

        if (!$priceData) {
            return new JsonResponse(['error' => 'Product not found'], Response::HTTP_NOT_FOUND);
        }

        return new JsonResponse($priceData);
    }
}
