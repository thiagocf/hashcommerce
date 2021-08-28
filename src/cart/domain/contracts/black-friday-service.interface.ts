import { CheckoutResponseInterface } from './checkout-response.interface';

export interface BlackFridayServiceInterface {
  updateCheckoutResponse(
    checkoutResponse: CheckoutResponseInterface,
  ): Promise<CheckoutResponseInterface>;
}
