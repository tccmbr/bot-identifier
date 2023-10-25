import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { SessionsConsumerDataType } from './sessions-consumer.service';

@Injectable()
export class SessionsProducerService {
  constructor(@InjectQueue('sessions') private sessionsQueue: Queue) {}

  async process(data: SessionsConsumerDataType) {
    await this.sessionsQueue.add(data);
  }
}
