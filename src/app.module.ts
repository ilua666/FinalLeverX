import { MONGO_CONNECTION_STRING } from './resource';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MongoModule } from './mongo/mongo.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ProfileModule } from './profile/profile.module';
import { MessageModule } from './message/message.module';

@Module({
  imports: [AuthModule, UsersModule, MongoModule, MongooseModule.forRoot(MONGO_CONNECTION_STRING), ProfileModule, MessageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
