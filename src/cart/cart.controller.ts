import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { CheckoutPresenter } from './checkout-presenter/checkout-presenter';
import { CheckoutRequestDto } from './dto/checkout-request.dto';
import { NestCheckoutUseCase } from './checkout-usecase/nest-checkout.usecase';

@Controller('cart')
export class CartController {
  constructor(
    private readonly checkoutPresenter: CheckoutPresenter,
    private readonly nestCheckoutUseCase: NestCheckoutUseCase,
  ) {}

  @Post('checkout')
  @HttpCode(200)
  async checkout(@Body() checkoutCartDto: CheckoutRequestDto) {
    const result = await this.nestCheckoutUseCase.execute(checkoutCartDto);
    return this.checkoutPresenter.render(result);
  }
}
