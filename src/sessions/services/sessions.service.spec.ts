import { Test, TestingModule } from '@nestjs/testing';
import { SessionsService } from './sessions.service';

describe('SessionsService', () => {
  let service: SessionsService;

  class sessionModelMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsService,
        {
          provide: 'SessionModel',
          useClass: sessionModelMock,
        },
      ],
    }).compile();

    service = module.get<SessionsService>(SessionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
