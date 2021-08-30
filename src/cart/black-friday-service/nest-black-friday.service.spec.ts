import { Test, TestingModule } from '@nestjs/testing';
import { NestBlackFridayService } from './nest-black-friday.service';
import { ProductRepositoryService } from '../product-repository/product-repository.service';

describe('nest black friday service', () => {
  let service: NestBlackFridayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductRepositoryService, NestBlackFridayService],
    }).compile();

    service = module.get<NestBlackFridayService>(NestBlackFridayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
