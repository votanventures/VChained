import { Body, Get, Headers, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { MasterService } from '../services/MasterService';
import { MasterError } from '../dto/MasterError';


export abstract class MasterController {
    protected constructor(protected readonly service: MasterService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, id: string, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body,id);
        } catch (e) {
            throw new MasterError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Master.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, body: any, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],id,body);
        } catch (e) {
            throw new MasterError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Master.error');
        }
    }

    @Get('/getInventory')
    async getUserData(@Body('id') id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getMasterData(header['x-api-key'],id,body);
         } catch(e) {
            throw new MasterError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Master.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],id,body);
         } catch(e) {
            throw new MasterError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Master.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],id);
        } catch(e) {
            throw new MasterError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}
