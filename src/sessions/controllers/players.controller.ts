import { Controller, Get } from '@nestjs/common';
import { PlayersService } from '../services/players.service';

@Controller('players')
export class PlayersController {
  constructor(private readonly sessionsService: PlayersService) {}

  @Get()
  async findAll() {
    return await this.sessionsService.findAll();
  }
}
