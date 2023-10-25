import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as isbot from 'isbot';
import { SessionsService } from './sessions.service';
import { plainToClass } from 'class-transformer';
import { CreateSessionDto } from '../dto/create-session.dto';
import { Logger } from '@nestjs/common';
import { SpammerIdentifierService } from './spammer-identifier.service';
import { IncomingHttpHeaders } from 'http';

export type SessionsConsumerDataType = {
  params: {
    playerId: string;
    ip: string;
    userAgent: string;
    createdAt: string;
  };
  headers: IncomingHttpHeaders;
};

@Processor('sessions')
export class SessionsConsumerService {
  private readonly logger = new Logger(SessionsConsumerService.name);

  constructor(
    private readonly sessionsService: SessionsService,
    private readonly spammerIdentifierService: SpammerIdentifierService,
  ) {}

  @Process()
  async process(job: Job<SessionsConsumerDataType>) {
    const createSessionDto = this.hydrateParams(job.data);

    return await this.createSession(createSessionDto);
  }

  private hydrateParams(data: SessionsConsumerDataType) {
    const { params, headers } = data;
    const isBot = isbot(params.userAgent);
    const isSpammer = headers.referer
      ? this.spammerIdentifierService.isSpammer(headers.referer)
      : false;

    return plainToClass(CreateSessionDto, {
      ...params,
      isBot,
      isSpammer,
    });
  }

  private async createSession(createSessionDto: CreateSessionDto) {
    const sessionCreated = await this.sessionsService.create(createSessionDto);

    if (!sessionCreated)
      this.logger.error('Não foi possível salvar!', [{ data: createSessionDto }]);

    return sessionCreated;
  }
}
