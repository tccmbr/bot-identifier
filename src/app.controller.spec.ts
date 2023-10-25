import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { SessionsProducerService } from './sessions/services/sessions-producer.service';

describe('AppController', () => {
  let controller: AppController;

  class SessionsProducerServiceMock {}

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: SessionsProducerService,
        useClass: SessionsProducerServiceMock,
      }],
    }).compile();

    controller = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
