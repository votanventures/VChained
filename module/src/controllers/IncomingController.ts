import { Body, Get, Headers, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { IncomingService } from '../services/IncomingService';
import { IncomingError } from "../dto/IncomingError";

export abstract class IncomingController {
    protected constructor(protected readonly service: IncomingService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, id: string, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body,id);
        } catch (e) {
            throw new IncomingError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, body: any, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],id,body);
        } catch (e) {
            throw new IncomingError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getIncoming')
    async getIncomingData(@Body('id') id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getIncomingData(header['x-api-key'],id,body);
         } catch(e) {
            throw new IncomingError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],id,body);
         } catch(e) {
            throw new IncomingError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],id,body);
        } catch(e) {
            throw new IncomingError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}
