<?php

namespace App\Command;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Contracts\HttpClient\HttpClientInterface;

#[AsCommand(
    name: 'app:sync-products',
    description: 'Sync products from DummyJSON API',
)]
class SyncProductsCommand extends Command
{
    public function __construct(
        private HttpClientInterface $httpClient,
        private EntityManagerInterface $entityManager
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        try {
            $response = $this->httpClient->request('GET', 'https://dummyjson.com/products');
            $data = $response->toArray();

            $created = 0;
            $updated = 0;

            foreach ($data['products'] as $productData) {
                $externalId = (string) $productData['id'];
                
                // Try to find existing product by externalId
                $product = $this->entityManager->getRepository(Product::class)
                    ->findOneBy(['externalId' => $externalId]);

                if (!$product) {
                    $product = new Product();
                    $product->setExternalId($externalId);
                    $created++;
                } else {
                    $updated++;
                }

                $product->setName($productData['title'])
                    ->setCategory($productData['category'])
                    ->setPriceGross((string) $productData['price'])
                    ->setCurrency('USD');

                $this->entityManager->persist($product);
            }

            $this->entityManager->flush();

            $io->success(sprintf(
                'Products synchronized successfully! Created: %d, Updated: %d',
                $created,
                $updated
            ));

            return Command::SUCCESS;
        } catch (\Exception $e) {
            $io->error('Failed to sync products: ' . $e->getMessage());
            return Command::FAILURE;
        }
    }
}
