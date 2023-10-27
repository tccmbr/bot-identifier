import { Test, TestingModule } from '@nestjs/testing';
import { SessionsProducerService } from './sessions-producer.service';
import { BullModule } from '@nestjs/bull';

describe('SessionsProducerService', () => {
  let service: SessionsProducerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        BullModule.registerQueue({
          name: 'sessions',
        }),
      ],
      providers: [SessionsProducerService],
    }).compile();

    service = module.get<SessionsProducerService>(SessionsProducerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
