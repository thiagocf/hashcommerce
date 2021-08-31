import { CheckoutResponseProductInterface } from './checkout-response-product.interface';

export interface AddCheckoutResponseProductInterface {
  addProduct(product: CheckoutResponseProductInterface): void;
}
export interface CheckoutResponseDataInterface {
  totalAmount: number;
  totalDiscount: number;
  products: Array<CheckoutResponseProductInterface>;
  totalAmountWithDiscount: number;
}
export interface CheckoutResponseInterface
  extends AddCheckoutResponseProductInterface,
    CheckoutResponseDataInterface {}
