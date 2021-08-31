import { Injectable } from '@nestjs/common';
import { CheckoutResponseDataInterface } from '../domain/use-cases/contracts/checkout-response.interface';

@Injectable()
export class CheckoutPresenter {
  render(response: CheckoutResponseDataInterface) {
    const products = response.products.map(
      ({
        isGift: is_gift,
        totalAmount: total_amount,
        unitAmount: unit_amount,
        ...others
      }) => ({
        total_amount,
        unit_amount,
        is_gift,
        ...others,
      }),
    );

    return {
      total_amount: response.totalAmount,
      total_amount_with_discount: response.totalAmountWithDiscount,
      total_discount: response.totalDiscount,
      products,
    };
  }
}
