import { Controller, Get, NotFoundException, Param, Query } from '@nestjs/common';
import { SearchDto } from '../dto/search-session.dto';
import { SessionsService } from '../services/sessions.service';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Get()
  async findAll(@Query() searchDto: SearchDto) {
    return await this.sessionsService.findAll(searchDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const result = await this.sessionsService.findOneById(id);

    if (!result) throw new NotFoundException();

    return result;
  }
}
