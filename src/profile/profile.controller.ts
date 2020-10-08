import { ProfileService } from './profile.service';
import { JwtAuthGuard } from './../auth/jwt-auth-guard';
import { Controller, Get, Param, Put, UseGuards,Request, Body } from '@nestjs/common';
import { Profile } from 'src/mongo/schemas/profile.schema';
import { ProfileDto } from './profile.dto';

@Controller('profile')
export class ProfileController {
    constructor(private profileService:  ProfileService){}

    //@UseGuards(JwtAuthGuard)
    @Get(':id')
    async getProfileById(@Param() params):Promise<Profile>{
        return this.profileService.getProfile(params.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getProfile(@Request()req):Promise<Profile>{
        return this.profileService.getProfile(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async putProfile(@Request()req, @Body() body:ProfileDto){
        return this.profileService.putProfile(req.user.id, body)

    }
}
