import { CheckoutResponseInterface } from '../../use-cases/contracts/checkout-response.interface';

export interface BlackFridayServiceInterface {
  updateCheckoutResponse(
    checkoutResponse: CheckoutResponseInterface,
  ): Promise<CheckoutResponseInterface>;
}
