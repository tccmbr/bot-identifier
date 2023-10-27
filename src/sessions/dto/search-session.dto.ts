import { Injectable } from '@nestjs/common';
import {
  IsBooleanString,
  IsDateString,
  IsIP,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';

@Injectable()
export class SearchDto {
  @IsOptional()
  @IsString()
  playerId: string;

  @IsOptional()
  @IsIP()
  ip: string;

  @IsOptional()
  @IsBooleanString()
  isBot: boolean;

  @IsOptional()
  @IsBooleanString()
  isSpammer: boolean;

  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsNumberString()
  limit: number;
}
