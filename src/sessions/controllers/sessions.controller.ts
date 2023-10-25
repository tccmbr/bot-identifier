import { Controller, Get, Query } from '@nestjs/common';
import { SearchDto } from '../dto/search-session.dto';
import { SessionsService } from '../services/sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async index(@Query() searchDto: SearchDto) {
    return await this.sessionsService.findAll(searchDto);
  }
}
