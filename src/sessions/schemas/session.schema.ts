import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SessionDocument = HydratedDocument<Session>;

@Schema()
export class Session {
  @Prop()
  playerId: string;

  @Prop()
  ip: string;

  @Prop()
  userAgent: string;

  @Prop({ index: true })
  createdAt: Date;

  @Prop()
  isBot: boolean;

  @Prop()
  isSpammer: boolean;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
