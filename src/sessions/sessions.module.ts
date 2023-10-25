import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SessionsConsumerService } from './services/sessions-consumer.service';
import { SessionsProducerService } from './services/sessions-producer.service';
import { SessionsService } from './services/sessions.service';
import { SessionsController } from './controllers/sessions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './schemas/session.schema';
import { SpammerIdentifierService } from './services/spammer-identifier.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        limiter: {
          max: 100,
          duration: 30000,
        },
        redis: {
          host: configService.get('QUEUE_HOST'),
          port: configService.get('QUEUE_PORT'),
          password: configService.get('QUEUE_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'sessions',
    }),
  ],
  providers: [
    SessionsProducerService,
    SessionsConsumerService,
    SessionsService,
    SpammerIdentifierService,
  ],
  exports: [SessionsProducerService],
  controllers: [SessionsController],
})
export class SessionsModule {}
