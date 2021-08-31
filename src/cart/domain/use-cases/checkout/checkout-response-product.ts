import { CheckoutResponseProductInterface } from '../contracts/checkout-response-product.interface';

export class CheckoutResponseProduct
  implements CheckoutResponseProductInterface
{
  public totalAmount: number;
  public discount: number;
  constructor(
    public id: number,
    public quantity: number,
    public unitAmount: number,
    public isGift: boolean,
    discountPercent: number,
  ) {
    this.totalAmount = this.quantity * this.unitAmount;
    this.discount = Math.round(this.totalAmount * discountPercent);
  }
}
