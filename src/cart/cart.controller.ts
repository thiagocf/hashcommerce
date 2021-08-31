import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CheckoutPresenter } from './checkout-presenter/checkout-presenter';
import { BlackFridayService } from './domain/use-cases/checkout/black-friday-service/black-friday.service';
import { CheckoutUseCase } from './domain/use-cases/checkout/checkout.usecase';
import { ProductDiscountService } from './product-discount-service/product-discount.service';
import { ProductRepositoryService } from './product-repository/product-repository.service';
import { CheckoutRequestDto } from './dto/checkout-request.dto';

@Controller('cart')
export class CartController {
  constructor(
    private readonly blackFridayService: BlackFridayService,
    private readonly productRepository: ProductRepositoryService,
    private readonly productDiscountService: ProductDiscountService,
    private readonly checkoutPresenter: CheckoutPresenter,
  ) {}

  @Post('checkout')
  @HttpCode(200)
  async checkout(@Body() checkoutCartDto: CheckoutRequestDto) {
    const checkoutUseCase = new CheckoutUseCase(
      this.productDiscountService,
      this.blackFridayService,
      this.productRepository,
      checkoutCartDto,
    );
    const result = await checkoutUseCase.execute();
    return this.checkoutPresenter.render(result);
  }
}
