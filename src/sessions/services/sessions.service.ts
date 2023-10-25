import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from '../dto/create-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Session } from '../schemas/session.schema';
import { SearchDto } from '../dto/search-session.dto';
import * as moment from 'moment';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const createdSession = new this.sessionModel(createSessionDto);
    return createdSession.save();
  }

  async findAll(searchDto: SearchDto): Promise<Session[]> {
    const where = {};

    if (searchDto.createdAt) {
      const createdAtGte = moment(searchDto.createdAt).startOf('day').format();
      const createdAtLte = moment(searchDto.createdAt).endOf('day').format();

      Object.assign(where, {
        createdAt: {
          $gte: createdAtGte,
          $lte: createdAtLte,
        },
      });
    }

    return this.sessionModel.find(where).exec();
  }
}
