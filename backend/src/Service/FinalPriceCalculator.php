<?php

namespace App\Service;

use App\Entity\DiscountRule;
use App\Entity\Product;
use App\Service\Discount\DiscountStrategyInterface;

class FinalPriceCalculator
{
    /**
     * @param DiscountStrategyInterface[] $discountStrategies
     */
    public function __construct(
        private iterable $discountStrategies
    ) {
    }

    public function calculateFinalPrice(Product $product, ?DiscountRule $discountRule = null): string
    {
        if ($discountRule === null) {
            return $product->getPriceGross();
        }

        foreach ($this->discountStrategies as $strategy) {
            if ($strategy->supports($discountRule->getType())) {
                return $strategy->calculate($product->getPriceGross(), $discountRule);
            }
        }

        throw new \InvalidArgumentException(
            sprintf('No discount strategy found for type: %s', $discountRule->getType())
        );
    }
}
