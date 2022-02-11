import { Body, Get, Headers, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ParticipentService } from '../services/ParticipentService';
import { ParticipentError } from '../dto/ParticipentError';

export abstract class ParticipentController {
    protected constructor(protected readonly service: ParticipentService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, id: string, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body,id);
        } catch (e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, body:any, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],id,body);
        } catch (e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }

    @Get('/getParticipent"')
    async getParticipentData(@Body('id') id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getParticipentData(header['x-api-key'],id,body);
         } catch(e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('user_id') user_id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],user_id,body);
         } catch(e) {
            throw new ParticipentError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() user_id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],user_id,body);
        } catch(e) {
            throw new ParticipentError(`Incompatible chain`, 'deleteParticipent.error')
        }
    }
}

