<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20240830000000 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create products and discount_rules tables';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            external_id VARCHAR(255) DEFAULT NULL,
            name VARCHAR(255) NOT NULL,
            category VARCHAR(100) NOT NULL,
            price_gross NUMERIC(10,2) NOT NULL,
            currency VARCHAR(3) NOT NULL DEFAULT \'PLN\',
            created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
        )');
        
        $this->addSql('CREATE UNIQUE INDEX idx_external_id ON products (external_id)');
        $this->addSql('COMMENT ON COLUMN products.created_at IS \'(DC2Type:datetime_immutable)\'');

        $this->addSql('CREATE TABLE discount_rules (
            id SERIAL PRIMARY KEY,
            type VARCHAR(50) NOT NULL,
            value NUMERIC(5,2) NOT NULL
        )');

        // Insert a sample discount rule
        $this->addSql('INSERT INTO discount_rules (type, value) VALUES (\'PERCENT\', 10.00)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP TABLE discount_rules');
        $this->addSql('DROP TABLE products');
    }
}
