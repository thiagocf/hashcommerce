import { BlackFridayServiceInterface } from '../../services/contracts/black-friday-service.interface';
import { CheckoutResponseInterface } from '../contracts/checkout-response.interface';
import { ProductDiscountServiceInterface } from '../../services/contracts/product-discount-service/product-discount-service.interface';
import { ProductRepositoryInterface } from '../../services/contracts/product-repository.interface';
import { CheckoutRequestDtoInterface } from '../../dto/checkout-request.dto.interface';
import { CheckoutResponse } from './checkout-response';
import { CheckoutResponseProduct } from './checkout-response-product';

export class CheckoutUseCase {
  constructor(
    private readonly productDiscountService: ProductDiscountServiceInterface,
    private readonly blackFridayService: BlackFridayServiceInterface,
    private readonly productRepository: ProductRepositoryInterface,
  ) {}

  async execute(
    checkoutCartDto: CheckoutRequestDtoInterface,
  ): Promise<CheckoutResponseInterface> {
    const checkoutResponse = new CheckoutResponse();

    for (const requestProduct of checkoutCartDto.products) {
      const product = await this.productRepository.get(requestProduct.id);
      if (!product) continue;

      const discount = await this.productDiscountService.getDiscount(
        requestProduct.id,
      );
      const responseProduct = new CheckoutResponseProduct(
        product.id,
        requestProduct.quantity,
        product.amount,
        product.isGift,
        discount,
      );
      checkoutResponse.addProduct(responseProduct);
    }

    return this.blackFridayService.updateCheckoutResponse(checkoutResponse);
  }
}
