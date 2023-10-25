import { Test, TestingModule } from '@nestjs/testing';
import { SessionsConsumerDataType, SessionsConsumerService } from './sessions-consumer.service';
import { SessionsService } from './sessions.service';
import { SpammerIdentifierService } from './spammer-identifier.service';
import { Job } from 'bull';
import { plainToClass } from 'class-transformer';
import { Session } from '../schemas/session.schema';

describe('SessionsConsumerService', () => {
  let service: SessionsConsumerService;
  let sessionsService: SessionsService;

  class SessionsServiceMock {}
  class SpammerIdentifierServiceMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionsConsumerService,
        {
          provide: SessionsService,
          useClass: SessionsServiceMock,
        },
        {
          provide: SpammerIdentifierService,
          useClass: SpammerIdentifierServiceMock,
        },
      ],
    }).compile();

    service = await module.resolve(SessionsConsumerService);
    sessionsService = await module.resolve(SessionsService);
    sessionsService.create = jest.fn().mockImplementation((data: SessionsConsumerDataType) => {
      return plainToClass(Session, data);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('process', () => {
    describe('when pass data', () => {
      it ('must return create session with new fields', async () => {
        const data = {
          data: {
            params: {
              playerId: '123',
              ip: '177.223.83.1',
              userAgent: '',
              createdAt: '',
            },
            headers: {},
          },
        } as Job<SessionsConsumerDataType>;

        const result = await service.process(data);

        expect(result).toBeInstanceOf(Session);
        expect(result.ip).toBe('177.223.83.1');
        expect(result.isBot).toBeFalsy;
        expect(result.isSpammer).toBeFalsy;
      });
    });
  });
});
