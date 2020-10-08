import { Profile } from './../mongo/schemas/profile.schema';
import { GOOGLE_CLIENT_ID } from './../resource';
import { MongoService } from './../mongo/mongo.service';
import { RegisterUserDto } from './regitser-user-dto';
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { UsersService } from '../users/users.service';
import {OAuth2Client} from 'google-auth-library'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mongoService:MongoService
  ) {}

  // async validateUser(username: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);
  //   if (user && user.password === pass) {
  //     const { password, ...result } = user;
  //     return result;
  //   }
  //   return null;
  // }

  oauthClient = new OAuth2Client(GOOGLE_CLIENT_ID) 
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.mongoService.findLocalUser(username);
    if (user) {
      if(await bcrypt.compare(pass,user.password)){
        //const { password, ...result } = user;
        return user.profile;
      }
    }
    return null;
  }

  async validateGoogleUser(googleToken:string): Promise<any> {
    const ticket = await this.oauthClient.verifyIdToken({
      idToken: googleToken,
      audience: GOOGLE_CLIENT_ID
    })
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const googleUser = await this.mongoService.getOrCreateGoogleUser(userid);
    return googleUser.profile
  }

  async register(username:string, password:string){
    const salt = bcrypt.genSaltSync(10)
    const hashPassword = await bcrypt.hash(password, salt)
    return this.mongoService.createUser(username, hashPassword)
  }

  async login(id: any) {
    const payload = { id:id};
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // async loginGoogle(google_token: string){
  //   const ticket = await this.oauthClient.verifyIdToken({
  //     idToken: google_token,
  //     audience: GOOGLE_CLIENT_ID
  //   })
  //   const userid = ticket.getPayload['sub'];
  //   const googleUser = await this.mongoService.getOrCreateGoogleUser(userid);
  //   return {
  //     access_token: this.jwtService.sign({id:googleUser.profile}),
  //   };
  // }
  
  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }
}