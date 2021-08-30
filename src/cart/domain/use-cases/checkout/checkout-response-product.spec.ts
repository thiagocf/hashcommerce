import { CheckoutResponseProduct } from './checkout-response-product';

describe('checkout use case: checkout response product', () => {
  it('should compute total amount when created', () => {
    const PRODUCT_DATA = {
      id: 1,
      quantity: 5,
      unitAmount: 1000,
      isGift: true,
      discountPercent: 0.03,
    };
    const EXPECTED_TOTAL = PRODUCT_DATA.quantity * PRODUCT_DATA.unitAmount;
    const EXPECTED_DISCOUNT = EXPECTED_TOTAL * PRODUCT_DATA.discountPercent;
    const checkoutResponseProduct = new CheckoutResponseProduct(
      PRODUCT_DATA.id,
      PRODUCT_DATA.quantity,
      PRODUCT_DATA.unitAmount,
      PRODUCT_DATA.isGift,
      PRODUCT_DATA.discountPercent,
    );

    expect(checkoutResponseProduct.totalAmount).toBe(EXPECTED_TOTAL);
    expect(checkoutResponseProduct.discount).toBe(EXPECTED_DISCOUNT);
  });

  it('should compute discount when created', () => {
    const PRODUCT_DATA = {
      id: 1,
      quantity: 5,
      unitAmount: 1000,
      isGift: true,
      discountPercent: 0.03,
    };
    const EXPECTED_TOTAL = PRODUCT_DATA.quantity * PRODUCT_DATA.unitAmount;
    const EXPECTED_DISCOUNT = EXPECTED_TOTAL * PRODUCT_DATA.discountPercent;
    const checkoutResponseProduct = new CheckoutResponseProduct(
      PRODUCT_DATA.id,
      PRODUCT_DATA.quantity,
      PRODUCT_DATA.unitAmount,
      PRODUCT_DATA.isGift,
      PRODUCT_DATA.discountPercent,
    );

    expect(checkoutResponseProduct.discount).toBe(EXPECTED_DISCOUNT);
  });

  it('should round discount amount', () => {
    const PRODUCT_DATA = {
      id: 1,
      quantity: 5,
      unitAmount: 1111,
      isGift: true,
      discountPercent: 0.03,
    };
    const EXPECTED_TOTAL = PRODUCT_DATA.quantity * PRODUCT_DATA.unitAmount;
    const EXPECTED_DISCOUNT = Math.round(
      EXPECTED_TOTAL * PRODUCT_DATA.discountPercent,
    );
    const checkoutResponseProduct = new CheckoutResponseProduct(
      PRODUCT_DATA.id,
      PRODUCT_DATA.quantity,
      PRODUCT_DATA.unitAmount,
      PRODUCT_DATA.isGift,
      PRODUCT_DATA.discountPercent,
    );

    expect(checkoutResponseProduct.discount).toBe(EXPECTED_DISCOUNT);
  });
});
