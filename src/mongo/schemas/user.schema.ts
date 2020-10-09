import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, Types } from 'mongoose';

export type  UserDocument = User & Document

@Schema()
export class User{

    @Prop({type: Types.ObjectId, unique:true, required:true, ref: 'profiles'})
    profile: Types.ObjectId
    @Prop({ required: true, unique:true})
    username:string;

    @Prop({ required: true })
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);