import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, } from 'mongoose';

export type  MessageDocument = Message & Document

@Schema()
export class Message{

    @Prop({type: mongooseSchema.Types.ObjectId, required:true, ref: 'profiles'})
    profile: mongooseSchema.Types.ObjectId
    
    @Prop({ required: true})
    text:string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);