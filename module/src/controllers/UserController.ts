import { Body, Get, Headers, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { UserService } from '../services/UserService';
import { UserError } from '../dto/UserError';

export abstract class UserController {
    protected constructor(protected readonly service: UserService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, @Headers() header: object) {
        try {
            const {data} = await this.service.storeData(header['x-api-key'],body);
            return data;
        } catch (e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Post('/signup')
    async signupData(@Body() body: any, @Headers() header:object) {
        try{
            const {data} = await this.service.signupData(header['x-api-key'],body);
            return data;
        } catch(e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message ||  e}`, 'User.error');
        }
    }

    @Post('/login')
    async loginData(@Body() body: any, @Headers() header:object) {
        try{
            const {data} = await this.service.loginData(header['x-api-key'],body);
            return data;
        } catch(e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Get('/id')
    async getData(@Query('user_id') user_id: string, @Headers() header: object) {
        try {
            const {data} = await this.service.getData(header['x-api-key'],user_id);
            return data;
        } catch (e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Get('/getUser')
    async getUserData(@Body('user_id') @Headers() header: object) {
        try{
            const {data} = await this.service.getUserData(header['x-api-key']);
            return data;
         } catch(e) {
            throw new UserError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('user_id') user_id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.updateData(header['x-api-key'],user_id);
                return data;
         } catch(e) {
            throw new UserError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() user_id: string, @Headers() header: object) {
        try{
                const {data} = await this.service.deleteData(header['x-api-key'],user_id);
                return data;
        } catch(e) {
            throw new UserError(`Incompatible chain`, 'deleteUser.error')
        }
    }

}

