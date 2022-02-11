import { Body, Get, Headers, Param, Post, Put, Delete, UseGuards, Query } from '@nestjs/common';
import { EmployeeService } from '../services/EmployeeService';
import { EmployeeError } from '../dto/EmployeeError';

export abstract class EmployeeController {
    protected constructor(protected readonly service: EmployeeService) {

    }

    @Post('/create')
    async storeData(@Body() body: any, id: string, @Headers() header: object) {
        try {
            return await this.service.storeData(header['x-api-key'],body);
        } catch (e) {
            throw new EmployeeError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }

    @Get('/id')
    async getData(@Query('id') id: string, body:any, @Headers() header: object) {
        try {
            return await this.service.getData(header['x-api-key'],id);
        } catch (e) {
            throw new EmployeeError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'fabric.error');
        }
    }

    @Get('/getEmployee')
    async getEmployeeData(@Body('id') id: string, body : any, @Headers() header: object) {
        try{
            return await this.service.getEmployeeData(header['x-api-key'],id,body);
         } catch(e) {
            throw new EmployeeError(`Unexpected error occurred. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Put('/update')
    async updateData(@Body('id') id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.updateData(header['x-api-key'],id,body);
         } catch(e) {
            throw new EmployeeError(`Unexpected error occured. Reason: ${e.message?.message || e.response?.data || e.message || e}`, 'User.error');
        }
    }

    @Delete('/delete')
    async deleteData(@Body() id: string, body: any, @Headers() header: object) {
        try{
                return await this.service.deleteData(header['x-api-key'],id,body);
        } catch(e) {
            throw new EmployeeError(`Incompatible chain`, 'deleteEmployee.error')
        }
    }
}

