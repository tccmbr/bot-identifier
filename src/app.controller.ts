import { Controller, Get, Query, Req } from '@nestjs/common';
import { CreateSessionDto } from './sessions/dto/create-session.dto';
import { SessionsProducerService } from './sessions/services/sessions-producer.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly sessionsProducerService: SessionsProducerService,
  ) {}

  @Get()
  async index(
    @Query() createSessionDto: CreateSessionDto,
    @Req() req: Request,
  ) {
    await this.sessionsProducerService.process({
      params: createSessionDto,
      headers: req.headers,
    });

    return {
      message: 'Processado com sucesso!',
    };
  }
}
