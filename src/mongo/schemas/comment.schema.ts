import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, } from 'mongoose';

export type  CommentDocument = Comment & Document

@Schema()
export class Comment{

    @Prop({type: mongooseSchema.Types.ObjectId, required:true, ref: 'profiles'})
    profile: mongooseSchema.Types.ObjectId

    @Prop({type: mongooseSchema.Types.ObjectId, required:true, ref: 'messages'})
    message: mongooseSchema.Types.ObjectId
    
    @Prop({ required: true})
    text:string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);