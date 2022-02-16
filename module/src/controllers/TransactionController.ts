import { Body, Get, Headers, Param, Post, Put, Delete, Query } from '@nestjs/common';
import { TransactionService } from '../services/TransactionService';
import { TransactionError } from '../dto/TransactionError';


export abstract class TransactionController {
    protected constructor(protected readonly service: TransactionService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, @Headers() header: object) {
        try {
            const {data} = await this.service.storeData(header['x-api-key'],body);
            return data;
        } catch (e) {
            throw new TransactionError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Transaction.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, @Headers() header: object) {
        try {
            const {data} = await this.service.getData(header['x-api-key'],id);
            return data;
        } catch (e) {
            throw new TransactionError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Transaction.error');
        }
    }

    @Get('/getInventory')
    async getUserData(@Body('id') @Headers() header: object) {
        try{
            const {data} = await this.service.getMasterData(header['x-api-key']);
            return data;
         } catch(e) {
            throw new TransactionError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Transaction.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.updateData(header['x-api-key'],id);
                return data;
         } catch(e) {
            throw new TransactionError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'Transaction.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.deleteData(header['x-api-key'],id);
                return data;
        } catch(e) {
            throw new TransactionError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}
