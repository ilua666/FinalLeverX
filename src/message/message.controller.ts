import { MessageDto } from './message.dto';
import { Controller, Delete, Get, Post, Put, UseGuards,Request, Param, Query, Body } from '@nestjs/common';
import { query } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth-guard';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
    constructor(private messageService:  MessageService){}
    @Get(':id')
    async getProfileMessages(@Param() params, @Query() query){
        return this.messageService.getProfileMessages(params.id, query.limit, query.offset);
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getLocalMessages(@Request()req,@Query() query){
        return this.messageService.getProfileMessages(req.user.id, query.limit, query.offset);
    }

    @Get('one/:id')
    async getMessangeById(){
        //TODO
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async postMessange(@Request()req, @Body() message:MessageDto){
        return this.messageService.createUserMessage(req.user.id,message)
    }

    @UseGuards(JwtAuthGuard)
    @Put()
    async putMessange(){
        //TODO
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async deleteMessange(){
        //TODO
    }

}
