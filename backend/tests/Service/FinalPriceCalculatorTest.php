<?php

namespace App\Tests\Service;

use App\Entity\DiscountRule;
use App\Entity\Product;
use App\Service\Discount\PercentDiscountStrategy;
use App\Service\FinalPriceCalculator;
use PHPUnit\Framework\TestCase;

class FinalPriceCalculatorTest extends TestCase
{
    private FinalPriceCalculator $calculator;

    protected function setUp(): void
    {
        $strategies = [new PercentDiscountStrategy()];
        $this->calculator = new FinalPriceCalculator($strategies);
    }

    public function testCalculateFinalPriceWithoutDiscount(): void
    {
        $product = new Product();
        $product->setPriceGross('100.00');

        $finalPrice = $this->calculator->calculateFinalPrice($product);

        $this->assertEquals('100.00', $finalPrice);
    }

    public function testCalculateFinalPriceWithPercentDiscount(): void
    {
        $product = new Product();
        $product->setPriceGross('100.00');

        $discountRule = new DiscountRule();
        $discountRule->setType(DiscountRule::TYPE_PERCENT);
        $discountRule->setValue('10.00'); // 10% discount

        $finalPrice = $this->calculator->calculateFinalPrice($product, $discountRule);

        $this->assertEquals('90.00', $finalPrice);
    }

    public function testCalculateFinalPriceWithHighPercentDiscount(): void
    {
        $product = new Product();
        $product->setPriceGross('250.75');

        $discountRule = new DiscountRule();
        $discountRule->setType(DiscountRule::TYPE_PERCENT);
        $discountRule->setValue('25.00'); // 25% discount

        $finalPrice = $this->calculator->calculateFinalPrice($product, $discountRule);

        $this->assertEquals('188.06', $finalPrice);
    }

    public function testCalculateFinalPriceWithUnsupportedDiscountType(): void
    {
        $product = new Product();
        $product->setPriceGross('100.00');

        $discountRule = new DiscountRule();
        $discountRule->setType('UNSUPPORTED_TYPE');
        $discountRule->setValue('10.00');

        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('No discount strategy found for type: UNSUPPORTED_TYPE');

        $this->calculator->calculateFinalPrice($product, $discountRule);
    }
}
