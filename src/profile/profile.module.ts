import { MongoModule } from './../mongo/mongo.module';
import { MongoService } from 'src/mongo/mongo.service';
import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports:[MongoModule],
  controllers: [ProfileController],
  providers: [ProfileService]//MongoService]
})
export class ProfileModule {}
