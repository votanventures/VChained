import { Body, Get, Headers, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { InventoryService } from '../services/InventoryService';
import { InventoryError } from '../dto/InventoryError';


export abstract class InventoryController {
    protected constructor(protected readonly service: InventoryService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, @Headers() header: object) {
        try{
            const { data } = await this.service.storeData(header['x-api-key'],body);
            return data;
        } catch (e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, @Headers() header: object) {
        try {
            const { data } = await this.service.getData(header['x-api-key'],id);
            return data;
        } catch (e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getInventory')
    async getUserData(@Headers() header: object) {
        try{
            const { data } = await this.service.getInventoryData(header['x-api-key']);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getInventory/:pid')
    async getInventoryByPID(@Headers() pid:string, header: object) {
        try{
            const { data } = await this.service.getInventoryByPID(header['x-api-key'],pid);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getOutgoing/:pid')
    async getOutgoingByPID(@Headers() pid:string, header: object) {
        try{
            const { data } = await this.service.getOutgoingByPID(header['x-api-key'],pid);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getIncoming/:pid')
    async getIncomingByPID(@Headers() pid:string, header: object) {
        try{
            const { data } = await this.service.getIncomingByPID(header['x-api-key'],pid);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getParts')
    async getPartsData(@Headers() body:any, header: object) {
        try{
            const { data } = await this.service.getPartsData(header['x-api-key'],body);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Get('/getAllParts')
    async getAllParts(@Headers() body:any, header: object) {
        try{
            const { data } = await this.service.getAllParts(header['x-api-key'],body);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') productID: string, @Headers() header: object) {
        try{
            const { data } = await this.service.updateData(header['x-api-key'],productID);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }                                                         

    @Put('/addSubPart')
    async addSubPartData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.addSubPartData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/removeSubPart')
    async removeSubPartData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.removeSubPartData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/claim/reject')
    async claimRejectData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.claimRejectData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/claim/accept')
    async claimAcceptData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.claimAcceptData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/update/batch')
    async updateBatchData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.updateBatchData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Put('/insert/batch')
    async insertBatchData(@Body('id') id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.insertBatchData(header['x-api-key'],id);
            return data;
         } catch(e) {
            throw new InventoryError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Inventory.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, @Headers() header: object) {
        try{
            const { data } = await this.service.deleteData(header['x-api-key'],id);
            return data;
        } catch(e) {
            throw new InventoryError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}
