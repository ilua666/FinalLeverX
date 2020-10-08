import { RegisterUserDto } from './regitser-user-dto';
import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth-guard';
import { GoogleAuthGuard } from './google-auth-guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    //@UseGuards(GoogleAuthGuard)
    //@Post('/login/google')
    //async loginGoogle(@Request() req) {
    //  return this.authService.login(req.user);
    //}

    @Post('/login/google')
    async loginGoogle(@Body() body) {
      const sub =  await this.authService.validateGoogleUser(body.googleToken)
      return this.authService.login(sub);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async login(@Request() req) {
      return this.authService.login(req.user);
    }

    @Post ('/register')
    async register(@Body() user: RegisterUserDto) {
      await this.authService.register(user.username, user.password);
      return this.authService.login(user);
    }
}
