import { Test, TestingModule } from '@nestjs/testing';
import { ProductDiscountService } from './product-discount.service';

describe('product discount service', () => {
  let module: TestingModule;
  let service: ProductDiscountService;

  const EXPECTED_DISCOUNT = 0.05;

  let toPromise = jest.fn(() =>
    Promise.resolve({ percentage: EXPECTED_DISCOUNT }),
  );
  const getDiscount = jest.fn(() => ({ toPromise }));
  const discountService = { getDiscount };
  const mocksDiscountGrpcClient = {
    getService: jest.fn(() => discountService),
  };

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [
        ProductDiscountService,
        {
          provide: 'DISCOUNT_GRPC_SERVICE',
          useValue: mocksDiscountGrpcClient,
        },
      ],
    }).compile();

    service = module.get<ProductDiscountService>(ProductDiscountService);
    await module.init();
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the discount percentage when discount service is available', async () => {
    const discount = await service.getDiscount(1);
    expect(discount).toBe(EXPECTED_DISCOUNT);
  });

  it('should return discount as 0 when discount service is unavailable', async () => {
    toPromise = jest.fn().mockRejectedValue(new Error('service unavailable'));
    const discount = await service.getDiscount(1);
    expect(discount).toBe(0);
  });

  it('should return discount as 0 when discount service response is a empty object', async () => {
    toPromise = jest.fn().mockResolvedValue({});
    const discount = await service.getDiscount(1);
    expect(discount).toBe(0);
  });
});
