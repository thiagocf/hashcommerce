import { CheckoutResponseInterface } from '../../contracts/checkout-response.interface';
import { CheckoutResponseProductInterface } from '../../contracts/checkout-response-product.interface';

export class CheckoutResponse implements CheckoutResponseInterface {
  totalAmount = 0;
  totalDiscount = 0;
  products: Array<CheckoutResponseProductInterface> = [];

  addProduct(product: CheckoutResponseProductInterface) {
    this.products.push(product);
    this.totalAmount += product.totalAmount;
    this.totalDiscount += product.discount;
  }

  get totalAmountWithDiscount(): number {
    return this.totalAmount - this.totalDiscount;
  }
}
