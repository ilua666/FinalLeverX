import { MongoModule } from './../mongo/mongo.module';
import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [MongoModule],
  controllers: [MessageController],
  providers: [MessageService]
})
export class MessageModule {}
