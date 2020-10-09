import { MessageDto } from './message.dto';
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from 'src/mongo/mongo.service';
import { Message } from 'src/mongo/schemas/message.schema';

@Injectable()
export class MessageService {
    constructor(
        private mongoService:MongoService
    ) {}

    async getProfileMessages(id:string, limit:number = 100, offset:number = 0):Promise<Message[]>{
        const ret = await this.mongoService.getUserMessages(id,limit,offset);
        if (!ret){
            throw new NotFoundException()
        }
        return ret;
    }

    async createUserMessage(id:string, message:MessageDto){
        const ret = await this.mongoService.createUserMessage(id,message);
        return ret;
    }

    async deleteMessage(profileId:string, messageId:string){
        const gettedMessage = await this.mongoService.getMessageById(messageId);
        if (!gettedMessage){
            throw new NotFoundException()
        }
        if (gettedMessage.profile.toHexString() != profileId){
            throw new ForbiddenException()
        }
        const deletedMessage = await this.mongoService.deleteMessage(messageId);
        return deletedMessage
    }

    async getMessageById(messageId:string):Promise<Message>{
        const gettedMessage = await this.mongoService.getMessageById(messageId);
        if (!gettedMessage){
            throw new NotFoundException()
        }
        return gettedMessage;
    }

    async putUserMessage(profileId:string, messageId:string, message:MessageDto){
        const gettedMessage = await this.mongoService.getMessageById(messageId);
        if (!gettedMessage){
            throw new NotFoundException()
        }
        if (gettedMessage.profile.toHexString() != profileId){
            throw new ForbiddenException()
        }
        const puttedMessage = this.mongoService.putMessage(messageId,message);
        return puttedMessage;
    }
}
