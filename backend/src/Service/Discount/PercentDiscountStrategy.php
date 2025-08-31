<?php

namespace App\Service\Discount;

use App\Entity\DiscountRule;

class PercentDiscountStrategy implements DiscountStrategyInterface
{
    public function calculate(string $originalPrice, DiscountRule $discountRule): string
    {
        $price = (float) $originalPrice;
        $discountPercent = (float) $discountRule->getValue();
        
        $discountAmount = $price * ($discountPercent / 100);
        $finalPrice = $price - $discountAmount;
        
        return number_format($finalPrice, 2, '.', '');
    }
    
    public function supports(string $discountType): bool
    {
        return $discountType === DiscountRule::TYPE_PERCENT;
    }
}
