import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, } from 'mongoose';

export type  GoogleUserDocument = GoogleUser & Document

@Schema()
export class GoogleUser{

    @Prop({type: mongooseSchema.Types.ObjectId, unique:true, required:true, ref: 'profiles'})
    profile: mongooseSchema.Types.ObjectId
    
    @Prop({ required: true, unique:true})
    sub:string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);