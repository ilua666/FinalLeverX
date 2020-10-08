import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type  ProfileDocument = Profile & Document

@Schema()
export class Profile{
    
    @Prop()//{ required: true, unique:true})
    email:string;

    @Prop()//{ required: true })
    nickname:string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);