import { MessageDto } from './../message/message.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model, Types, Schema } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { GoogleUser, GoogleUserDocument } from './schemas/google.user.schema';
import { Message, MessageDocument } from './schemas/message.schema';
import { CommentDocument,Comment } from './schemas/comment.schema';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>, 
        @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
        @InjectModel(GoogleUser.name) private googleUserModel: Model <GoogleUserDocument>,
        @InjectModel(Message.name) private messageModel: Model <MessageDocument>,
        @InjectModel(Comment.name) private commentModel: Model <CommentDocument>
        ){}

    async createUser(username:string, hashPassword:string){
        const createdProfile = new this.profileModel();
        const createdUser = new this.userModel({username: username, password: hashPassword, profile: createdProfile._id});
        await createdUser.save();
        await createdProfile.save();
        return createdUser;
    }

    async getProfileById(id:string){
        return this.profileModel.findOne({_id:id})
    }

    //async getProfilesByString(str:string, limit: number = 100,offser: number = 0){
    //    return this.profileModel.find({nickname:{sear}})
    //}

    async putProfileById(id:string,profile:Profile){
        await this.profileModel.findOneAndUpdate({_id: id}, profile);
        return this.profileModel.findOne({_id:id});
    }

    async getOrCreateGoogleUser(sub:string){
        const googleUser = await this.googleUserModel.findOne({sub:sub})
        if(googleUser){
            return googleUser;
        } else{
            const createdProfile = new this.profileModel();
            const createdGoogleUser = new this.googleUserModel({sub: sub, profile:createdProfile._id});
            await createdGoogleUser.save();
            await createdProfile.save();
            return createdGoogleUser;
        }
    }

    async findLocalUser(username:string): Promise<User>{
        return this.userModel.findOne({username: username}).exec()
    }


    async getUserMessages(profileId:string, limit:number, offset:number){
        const objectId = new Types.ObjectId(profileId)
        return this.messageModel.find({profile: objectId}).skip(offset).limit(limit);
    }

    async getMessageById(messageId: string){
        return this.messageModel.findById(messageId);
    }

    async createUserMessage(profileId:string, message:MessageDto){
        const createdMessage = this.messageModel.create({text: message.text, profile: new Types.ObjectId(profileId)}) 
        return createdMessage;
    }

    async putMessage(messageId:string,message:MessageDto){
        await this.messageModel.findOneAndUpdate({_id: messageId}, message);
        return this.messageModel.findOne({_id:messageId});
    }

    async deleteMessage(messageId:string){
        const ret = this.messageModel.deleteOne({_id:messageId});
        return ret;
    }

}
