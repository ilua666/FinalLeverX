import { Injectable, NotFoundException } from '@nestjs/common';
import { MongoService } from 'src/mongo/mongo.service';
import { Profile } from 'src/mongo/schemas/profile.schema';

@Injectable()
export class ProfileService {

    constructor(
        private mongoService:MongoService
    ) {}

    async getProfile(id:string):Promise<Profile>{
        const ret = this.mongoService.getProfileById(id)
        if (!ret){
            throw new NotFoundException()
        }
        return ret;
    }

    async putProfile(id:string, profile:Profile){
        return this.mongoService.putProfileById(id,profile);
    }
}
