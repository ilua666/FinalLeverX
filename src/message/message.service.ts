import { MessageDto } from './message.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from 'src/mongo/mongo.service';
import { Message } from 'src/mongo/schemas/message.schema';

@Injectable()
export class MessageService {
    constructor(
        private mongoService:MongoService
    ) {}

    async getProfileMessages(id:string, limit:number = 100, offset:number = 0){
        const ret = this.mongoService.getUserMessages(id,limit,offset);
        if (!ret){
            throw new NotFoundException()
        }
        return ret;
    }

    async createUserMessage(id:string, message:MessageDto){
        return this.mongoService.createUserMessage(id,message);
    }
}
