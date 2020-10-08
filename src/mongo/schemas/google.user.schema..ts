import { MongooseModule, Prop, Schema, SchemaFactory, } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema, ObjectID } from 'mongoose';

export type  GoogleUserDocument = GoogleUser & Document

@Schema()
export class GoogleUser{

    @Prop({type: mongooseSchema.Types.ObjectID, unique:true, ref: 'profiles'})
    profile: mongooseSchema.Types.ObjectID
    
    @Prop({ required: true, unique:true})
    sub:string;
}

export const GoogleUserSchema = SchemaFactory.createForClass(GoogleUser);