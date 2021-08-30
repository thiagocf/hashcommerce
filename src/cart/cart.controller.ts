import { Controller, Post, Body } from '@nestjs/common';
import { BlackFridayService } from './domain/black-friday-service/black-friday.service';
import { CheckoutRequestDto } from './domain/dto/checkout-request.dto';
import { CheckoutUseCase } from './domain/use-cases/checkout/checkout.usecase';
import { ProductDiscountService } from './product-discount-service/product-discount.service';
import { ProductRepositoryService } from './product-repository/product-repository.service';

@Controller('cart')
export class CartController {
  constructor(
    private readonly blackFridayService: BlackFridayService,
    private readonly productRepository: ProductRepositoryService,
    private readonly productDiscountService: ProductDiscountService,
  ) {}

  @Post('checkout')
  checkout(@Body() checkoutCartDto: CheckoutRequestDto) {
    const checkoutUseCase = new CheckoutUseCase(
      this.productDiscountService,
      this.blackFridayService,
      this.productRepository,
      checkoutCartDto,
    );
    return checkoutUseCase.execute();
  }
}
