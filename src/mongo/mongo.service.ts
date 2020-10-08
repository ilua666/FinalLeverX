import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schemas/profile.schema';
import { GoogleUser, GoogleUserDocument } from './schemas/google.user.schema.';

@Injectable()
export class MongoService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>, 
        @InjectModel(Profile.name) private profileModule: Model<ProfileDocument>,
        @InjectModel(GoogleUser.name) private googleUserModel: Model <GoogleUserDocument>,
        ){}

    async createUser(username:string, hashPassword:string){
        const createdProfile = new this.profileModule();
        const createdUser = new this.userModel({username: username, password: hashPassword, profile: createdProfile._id});
        await createdUser.save();
        await createdProfile.save();
        return createdUser;
    }

    async getOrCreateGoogleUser(sub:string){
        const googleUser = await this.googleUserModel.findOne({sub:sub})
        if(googleUser){
            return googleUser;
        } else{
            const createdProfile = new this.profileModule();
            const createdGoogleUser = new this.googleUserModel({sub: sub, profile:createdProfile._id});
            await createdGoogleUser.save();
            await createdProfile.save();
            return createdGoogleUser;
        }
    }

    async findLocalUser(username:string): Promise<User>{
        return this.userModel.findOne({username: username}).exec()
    }

    // async getProdile
}
