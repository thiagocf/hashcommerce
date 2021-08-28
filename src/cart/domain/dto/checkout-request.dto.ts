import { CheckoutRequestProductDto } from './checkout-request-product.dto';

export interface CheckoutRequestDto {
  products: Array<CheckoutRequestProductDto>;
}
