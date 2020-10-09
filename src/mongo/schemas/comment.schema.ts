import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type  CommentDocument = Comment & Document

@Schema()
export class Comment{

    @Prop({type: Types.ObjectId, required:true, ref: 'profiles'})
    profile:Types.ObjectId

    @Prop({type: Types.ObjectId, required:true, ref: 'messages'})
    message: Types.ObjectId
    
    @Prop({ required: true})
    text:string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);