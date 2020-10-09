import { MessageDto } from './message.dto';
import { Controller, Delete, Get, Post, Put, UseGuards,Request, Param, Query, Body, BadRequestException } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService:  MessageService){}
    @Get(':id')
    async getProfileMessages(@Param() params, @Query() query){
        const res = await this.messageService.getProfileMessages(params.id, query.limit, query.offset);
        return res;
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getLocalMessages(@Request()req,@Query() query){
        return this.messageService.getProfileMessages(req.user.id, query.limit, query.offset);
    }

    @Get('one/:id')
    async getMessangeById(@Param() params){
        const res = await this.messageService.getMessageById(params.id);
        return res;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postMessange(@Request()req, @Body() message:MessageDto){
        return this.messageService.createUserMessage(req.user.id,message)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async putMessange(@Request()req, @Body() message:MessageDto, @Query() query){
        if(!query.id){
            throw new BadRequestException();
        }
        const ret = await this.messageService.putUserMessage(req.user.id, query.id ,message);
        return ret;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteMessange(@Request()req, @Query() query){
        if(!query.id){
            throw new BadRequestException();
        }
        const ret = await this.messageService.deleteMessage(req.user.id,query.id);
        return ret
    }

}
