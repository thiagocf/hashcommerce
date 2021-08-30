import { CheckoutUseCase } from './checkout.usecase';
import { CheckoutResponseProduct } from './checkout-response-product';

const PRODUCT_1 = {
  id: 1,
  title: 'Produto 1',
  description: 'Descrição produto 1',
  amount: 10000,
  isGift: false,
};

const PRODUCT_2 = {
  id: 2,
  title: 'Produto 2',
  description: 'Descrição produto 2',
  amount: 1000,
  isGift: false,
};

const CHECKOUT_RESPONSE = {
  addProduct: jest.fn(),
  totalAmount: 50000,
  totalDiscount: 500,
  totalAmountWithDiscount: 49500,
  products: [],
};

jest.mock('./checkout-response', () => {
  return {
    CheckoutResponse: jest.fn().mockImplementation(() => {
      return CHECKOUT_RESPONSE;
    }),
  };
});

jest.mock('./checkout-response-product');

const DEFAULT_DISCOUNT = 2;
const productDiscountService = {
  getDiscount: jest.fn().mockResolvedValue(DEFAULT_DISCOUNT),
};

const blackFridayService = {
  updateCheckoutResponse: jest.fn((checkoutResponse) => checkoutResponse),
};

const productRepositoryGetMock = jest
  .fn()
  .mockResolvedValueOnce(PRODUCT_1)
  .mockResolvedValueOnce(PRODUCT_2);

const productRepository = {
  get: productRepositoryGetMock,
  getAGift: jest.fn(),
};

const checkoutCartDto = {
  products: [
    { id: 1, quantity: 3 },
    { id: 2, quantity: 4 },
  ],
};

describe('checkout use case', () => {
  afterEach(() => {
    jest.clearAllMocks();
    productRepository.get = productRepositoryGetMock;
  });

  it('should process the checkout successfully', async () => {
    const checkout = new CheckoutUseCase(
      productDiscountService,
      blackFridayService,
      productRepository,
      checkoutCartDto,
    );

    const response = await checkout.execute();

    expect(response).toEqual(CHECKOUT_RESPONSE);

    expect(productRepository.get).toBeCalledTimes(
      checkoutCartDto.products.length,
    );
    expect(productDiscountService.getDiscount).toHaveBeenNthCalledWith(
      1,
      checkoutCartDto.products[0].id,
    );
    expect(productDiscountService.getDiscount).toHaveBeenNthCalledWith(
      2,
      checkoutCartDto.products[1].id,
    );

    expect(productDiscountService.getDiscount).toHaveBeenCalledTimes(
      checkoutCartDto.products.length,
    );
    expect(productDiscountService.getDiscount).toHaveBeenNthCalledWith(
      1,
      checkoutCartDto.products[0].id,
    );
    expect(productDiscountService.getDiscount).toHaveBeenNthCalledWith(
      2,
      checkoutCartDto.products[1].id,
    );

    expect(CHECKOUT_RESPONSE.addProduct).toHaveBeenCalledTimes(
      checkoutCartDto.products.length,
    );

    expect(CheckoutResponseProduct).toHaveBeenCalledTimes(
      checkoutCartDto.products.length,
    );
    expect(CheckoutResponseProduct).toHaveBeenNthCalledWith(
      1,
      PRODUCT_1.id,
      checkoutCartDto.products[0].quantity,
      PRODUCT_1.amount,
      PRODUCT_1.isGift,
      DEFAULT_DISCOUNT,
    );
    expect(CheckoutResponseProduct).toHaveBeenNthCalledWith(
      2,
      PRODUCT_2.id,
      checkoutCartDto.products[1].quantity,
      PRODUCT_2.amount,
      PRODUCT_2.isGift,
      DEFAULT_DISCOUNT,
    );

    expect(blackFridayService.updateCheckoutResponse).toHaveBeenCalledTimes(1);
    expect(blackFridayService.updateCheckoutResponse).toHaveBeenCalledWith(
      CHECKOUT_RESPONSE,
    );
  });

  it('should not include a requested product if it is not found', async () => {
    productRepository.get = jest.fn().mockResolvedValueOnce(PRODUCT_1);

    const checkout = new CheckoutUseCase(
      productDiscountService,
      blackFridayService,
      productRepository,
      checkoutCartDto,
    );

    await checkout.execute();
    expect(productDiscountService.getDiscount).toHaveBeenCalledTimes(1);
    expect(CHECKOUT_RESPONSE.addProduct).toHaveBeenCalledTimes(1);
  });
});
