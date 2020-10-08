import { Comment, CommentSchema } from './schemas/comment.schema';
import { Profile, ProfileSchema } from './schemas/profile.schema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';
import { User, UserSchema } from './schemas/user.schema';
import { GoogleUser, GoogleUserSchema } from './schemas/google.user.schema';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports:[MongooseModule.forFeature([
    {name: User.name, schema: UserSchema},
    {name: Profile.name, schema: ProfileSchema},
    {name: GoogleUser.name, schema: GoogleUserSchema},
    {name: Comment.name, schema: CommentSchema},
    {name: Message.name, schema: MessageSchema}
  ])],
  providers: [MongoService],
  exports:[MongoService,MongoModule]
})
export class MongoModule {}
