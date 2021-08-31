import { TestingModule, Test } from '@nestjs/testing';
import { CheckoutPresenter } from './checkout-presenter';

describe('checkout presenter', () => {
  let presenter: CheckoutPresenter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckoutPresenter],
    }).compile();

    presenter = module.get<CheckoutPresenter>(CheckoutPresenter);
  });

  it('should be defined', () => {
    expect(presenter).toBeDefined();
  });

  it('should render the response in snake case', () => {
    const INPUT = {
      totalAmount: 30000,
      totalAmountWithDiscount: 29500,
      totalDiscount: 500,
      products: [
        {
          isGift: false,
          totalAmount: 30000,
          unitAmount: 10000,
          id: 1,
          quantity: 3,
          discount: 500,
        },
      ],
    };

    const response = presenter.render(INPUT);
    expect(response).toEqual({
      total_amount: 30000,
      total_amount_with_discount: 29500,
      total_discount: 500,
      products: [
        {
          is_gift: false,
          total_amount: 30000,
          unit_amount: 10000,
          id: 1,
          quantity: 3,
          discount: 500,
        },
      ],
    });
  });
});
