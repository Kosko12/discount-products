<?php

namespace App\Service\Discount;

use App\Entity\DiscountRule;

interface DiscountStrategyInterface
{
    public function calculate(string $originalPrice, DiscountRule $discountRule): string;
    
    public function supports(string $discountType): bool;
}
