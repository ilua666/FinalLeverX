import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, ObjectID } from 'mongoose';

export type  UserDocument = User & Document

@Schema()
export class User{

    @Prop({type: mongooseSchema.Types.ObjectID, unique:true, ref: 'profiles'})
    profile: mongooseSchema.Types.ObjectID
    @Prop({ required: true, unique:true})
    username:string;

    @Prop({ required: true })
    password:string;
}

export const UserSchema = SchemaFactory.createForClass(User);