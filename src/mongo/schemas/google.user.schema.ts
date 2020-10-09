import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Types,  } from 'mongoose';

export type  GoogleUserDocument = GoogleUser & Document

@Schema()
export class GoogleUser{

    @Prop({type:Types.ObjectId, unique:true, required:true, ref: 'profiles'})
    profile: Types.ObjectId
    
    @Prop({ required: true, unique:true})
    sub:string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);