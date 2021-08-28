import { CheckoutResponseProductInterface } from './checkout-response-product.interface';

export interface CheckoutResponseInterface {
  totalAmount: number;
  totalDiscount: number;
  products: Array<CheckoutResponseProductInterface>;

  addProduct(product: CheckoutResponseProductInterface): void;
  get totalAmountWithDiscount(): number;
}
