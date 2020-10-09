import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, Types, } from 'mongoose';

export type  MessageDocument = Message & Document

@Schema()
export class Message{

    @Prop({type: Types.ObjectId, required:true, ref: 'profiles'})
    profile: Types.ObjectId
    
    @Prop({ required: true})
    text:string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);