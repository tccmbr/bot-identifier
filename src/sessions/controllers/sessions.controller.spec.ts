import { Test, TestingModule } from '@nestjs/testing';
import { SessionsController } from './sessions.controller';
import { SessionsService } from '../services/sessions.service';

describe('SessionsController', () => {
  let controller: SessionsController;

  class SessionServiceMock {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: SessionsService,
          useClass: SessionServiceMock,
        },
      ],
      controllers: [SessionsController],
    }).compile();

    controller = module.get<SessionsController>(SessionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
