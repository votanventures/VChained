import { Body, Get, Headers, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserError } from '../dto/UserError';

export abstract class UserController {
    protected constructor(protected readonly service: UserService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body);
        } catch (e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }
// working
    @Get('/id')
    async getData(@Query('user_id') user_id: string, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],user_id);
        } catch (e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }

    @Get('/getUser')
    async getUserData(@Body('user_id') user_id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getUserData(header['x-api-key'],user_id,body);
         } catch(e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('user_id') user_id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],user_id,body);
         } catch(e) {
            throw new UserError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() user_id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],user_id,body);
        } catch(e) {
            throw new UserError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}

