import { Injectable } from '@nestjs/common';
import { IsDateString, IsOptional } from 'class-validator';

@Injectable()
export class SearchDto {
  @IsOptional()
  @IsDateString()
  createdAt: Date;
}
