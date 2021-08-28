import { Test, TestingModule } from '@nestjs/testing';
import { NestBlackFridayService } from './nest-black-friday.service';

describe('nest black friday service', () => {
  let service: NestBlackFridayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NestBlackFridayService],
    }).compile();

    service = module.get<NestBlackFridayService>(NestBlackFridayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
