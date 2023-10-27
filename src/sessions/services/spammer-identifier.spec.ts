import { Test, TestingModule } from '@nestjs/testing';
import { SpammerIdentifierService } from './spammer-identifier.service';

describe('SpammerIdentifierService', () => {
  let service: SpammerIdentifierService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpammerIdentifierService],
    }).compile();

    service = module.get<SpammerIdentifierService>(SpammerIdentifierService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
