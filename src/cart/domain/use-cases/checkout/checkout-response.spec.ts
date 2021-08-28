import { CheckoutResponse } from './checkout-response';

describe('checkout use case: checkout response', () => {
  it('should be empty when started', () => {
    const checkoutResponse = new CheckoutResponse();
    expect(checkoutResponse.totalAmount).toBe(0);
    expect(checkoutResponse.totalDiscount).toBe(0);
    expect(checkoutResponse.products).toEqual([]);
    expect(checkoutResponse.totalAmountWithDiscount).toBe(0);
  });

  it('should compute totals when products are added', () => {
    const checkoutResponse = new CheckoutResponse();
    const product = {
      totalAmount: 30000,
      id: 1,
      quantity: 3,
      unitAmount: 10000,
      discount: 500,
      isGift: false,
    };
    checkoutResponse.addProduct(product);
    checkoutResponse.addProduct(product);
    checkoutResponse.addProduct(product);

    expect(checkoutResponse.totalAmount).toBe(3 * product.totalAmount);
    expect(checkoutResponse.totalDiscount).toBe(3 * product.discount);
    expect(checkoutResponse.products).toEqual([product, product, product]);
    expect(checkoutResponse.totalAmountWithDiscount).toBe(
      3 * (product.totalAmount - product.discount),
    );
  });
});
