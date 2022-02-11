import { Body, Get, Headers, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { InventoryService } from '../services/InventoryService';
import { InventoryError } from '../dto/InventoryError';


export abstract class InventoryController {
    protected constructor(protected readonly service: InventoryService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, id: string, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body,id);
        } catch (e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, body: any, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],id,body);
        } catch (e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getInventory')
    async getUserData(@Body('id') id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getInventoryData(header['x-api-key'],id,body);
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],id,body);
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],id,body);
        } catch(e) {
            throw new InventoryError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}
