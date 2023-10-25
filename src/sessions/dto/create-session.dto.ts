import { IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsNotEmpty()
  playerId: string;

  @IsNotEmpty()
  ip: string;

  @IsNotEmpty()
  userAgent: string;

  @IsNotEmpty()
  createdAt: string;
}
