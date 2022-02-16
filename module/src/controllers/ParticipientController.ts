import { Body, Get, Headers, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { ParticipentService } from '../services/ParticipentService';
import { ParticipentError } from '../dto/ParticipentError';

export abstract class ParticipientController {
    protected constructor(protected readonly service: ParticipentService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, @Headers() header: object) {
        try {
            const {data} = await this.service.storeData(header['x-api-key'],body);
            return data;
        } catch (e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Participient.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, @Headers() header: object) {
        try {
            const {data} = await this.service.getData(header['x-api-key'],id);
            return data;
        } catch (e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Participient.error');
        }
    }

    @Get('/getParticipent"')
    async getParticipentData(@Body('id') @Headers() header: object) {
        try{
            const {data} = await this.service.getParticipentData(header['x-api-key']);
            return data;
         } catch(e) {
            throw new ParticipentError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Participient.error');
        }
    }

    @Put('/update')
    async updateData(@Body('user_id') user_id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.updateData(header['x-api-key'],user_id);
                return data;
         } catch(e) {
            throw new ParticipentError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Participient.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() user_id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.deleteData(header['x-api-key'],user_id);
                return data;
        } catch(e) {
            throw new ParticipentError(`Incompatible chain`, 'deleteParticipent.error')
        }
    }
}

