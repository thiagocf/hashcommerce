import { Test, TestingModule } from '@nestjs/testing';
import { ProductRepositoryService } from './product-repository.service';
import { PRODUCT_LIST } from './products';

jest.mock('./products', () => ({
  PRODUCT_LIST: [
    {
      id: 1,
      title: 'Ergonomic Wooden Pants',
      description: 'Deleniti beatae porro.',
      amount: 15157,
      isGift: false,
    },
    {
      id: 2,
      title: 'Handcrafted Steel Towels',
      description: 'Nam ea sed animi neque qui non quis iste.',
      amount: 900,
      isGift: true,
    },
  ],
}));

describe('product repository service', () => {
  let service: ProductRepositoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepositoryService],
    }).compile();

    service = module.get<ProductRepositoryService>(ProductRepositoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get an existing product', () => {
    expect(service.get(PRODUCT_LIST[0].id)).toEqual(PRODUCT_LIST[0]);
  });

  it('should get a gift product', () => {
    expect(service.get(PRODUCT_LIST[1].id)).toEqual(PRODUCT_LIST[1]);
  });
});
