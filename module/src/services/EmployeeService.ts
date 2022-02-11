import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { EmployeeError } from '../dto/EmployeeError';

export abstract class EmployeeService {

    protected constructor(protected readonly logger: PinoLogger) {
        
    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            return axios.post('http://localhost:7000/api/employee/create',{headers:{"x-api-key":key}},data)
        } catch(e) {
            this.logger.error(e);
            throw new EmployeeError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async getData(id: string, key: string): Promise<{data: string}> {
        try {
            return axios.get('http://localhost:7000/api/employee/id',{headers:{"x-api-key":key}})
        } catch (e) {
            this.logger.error(e);
            throw new EmployeeError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async getEmployeeData(key: string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.get('http://localhost:7000/api/employee/getEmployee',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new EmployeeError(`Error occured. ${e}`, 'User.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/employee/update',{haeders:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new EmployeeError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async deleteData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/employee/delete',{headers:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new EmployeeError(`Error occurred. ${e}`, 'User.error');
        }
    }
}
