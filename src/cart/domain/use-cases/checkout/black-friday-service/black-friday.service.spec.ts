import { BlackFridayService } from './black-friday.service';
import MockDate from 'mockdate';

describe('black friday service', () => {
  const BF_DATE = new Date(2021, 11, 26);
  const NOT_BF_DATE = new Date(2021, 1, 1);
  const GIFT = {
    id: 100,
    title: 'The Hash gift',
    description: 'Best gift ever',
    amount: 1,
    isGift: true,
  };
  const productRepository = {
    get: jest.fn(),
    getAGift: jest.fn().mockResolvedValue(GIFT),
  };

  afterEach(() => {
    jest.clearAllMocks();
    MockDate.reset();
  });

  it('should include a gift if today is black friday', async () => {
    MockDate.set(BF_DATE);
    const checkoutResponse = {
      addProduct: jest.fn(),
      totalAmount: 0,
      totalDiscount: 0,
      totalAmountWithDiscount: 0,
      products: [],
    };

    const blackFridayService = new BlackFridayService(productRepository);
    const result = await blackFridayService.updateCheckoutResponse(
      checkoutResponse,
    );

    expect(result).toEqual(checkoutResponse);
    expect(productRepository.getAGift).toHaveBeenCalledTimes(1);
    expect(checkoutResponse.addProduct).toHaveBeenCalledTimes(1);
    expect(checkoutResponse.addProduct).toHaveBeenCalledWith({
      totalAmount: 0,
      id: GIFT.id,
      quantity: 1,
      unitAmount: 0,
      discount: 0,
      isGift: true,
    });
  });

  it('should not include a gift if there is already a gift and today is black friday', async () => {
    MockDate.set(BF_DATE);
    const checkoutResponse = {
      addProduct: jest.fn(),
      totalAmount: 0,
      totalDiscount: 0,
      totalAmountWithDiscount: 0,
      products: [
        {
          totalAmount: 0,
          id: GIFT.id,
          quantity: 1,
          unitAmount: 0,
          discount: 0,
          isGift: true,
        },
      ],
    };

    const blackFridayService = new BlackFridayService(productRepository);
    const result = await blackFridayService.updateCheckoutResponse(
      checkoutResponse,
    );

    expect(result).toEqual(checkoutResponse);
    expect(productRepository.getAGift).toHaveBeenCalledTimes(0);
    expect(checkoutResponse.addProduct).toHaveBeenCalledTimes(0);
  });

  it('should not include a gift if today is not black friday', async () => {
    MockDate.set(NOT_BF_DATE);
    const checkoutResponse = {
      addProduct: jest.fn(),
      totalAmount: 0,
      totalDiscount: 0,
      totalAmountWithDiscount: 0,
      products: [],
    };

    const blackFridayService = new BlackFridayService(productRepository);
    const result = await blackFridayService.updateCheckoutResponse(
      checkoutResponse,
    );

    expect(result).toEqual(checkoutResponse);
    expect(productRepository.getAGift).toHaveBeenCalledTimes(0);
    expect(checkoutResponse.addProduct).toHaveBeenCalledTimes(0);
  });
});
