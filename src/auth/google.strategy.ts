import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as googleAuthLibrary from 'google-auth-library'


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(googleToken: string ): Promise<any> {
    const user = await this.authService.validateGoogleUser(googleToken);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}