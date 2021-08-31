import { BlackFridayServiceInterface } from '../../../services/contracts/black-friday-service.interface';
import { CheckoutResponseProductInterface } from '../../contracts/checkout-response-product.interface';
import { CheckoutResponseInterface } from '../../contracts/checkout-response.interface';
import { ProductRepositoryInterface } from '../../../services/contracts/product-repository.interface';

export class BlackFridayService implements BlackFridayServiceInterface {
  private readonly blackFridayDate = new Date(2021, 11, 26);

  constructor(private readonly productRepository: ProductRepositoryInterface) {}

  async updateCheckoutResponse(
    checkoutResponse: CheckoutResponseInterface,
  ): Promise<CheckoutResponseInterface> {
    if (!this.isBlackFriday() || this.hasGift(checkoutResponse.products))
      return checkoutResponse;

    const gift = await this.productRepository.getAGift();
    checkoutResponse.addProduct({
      totalAmount: 0,
      id: gift.id,
      quantity: 1,
      unitAmount: 0,
      discount: 0,
      isGift: true,
    });
    return checkoutResponse;
  }

  hasGift(products: Array<CheckoutResponseProductInterface>) {
    return !!products.find(({ isGift }) => isGift);
  }

  isBlackFriday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today.getTime() === this.blackFridayDate.getTime();
  }
}
