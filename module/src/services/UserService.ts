import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { UserError } from '../dto/UserError';

export abstract class UserService {

    protected constructor(protected readonly logger: PinoLogger) {
        
    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            return axios.post('http://localhost:7000/api/user/create',{headers:{"x-api-key":key}},data)
        } catch(e) {
            this.logger.error(e);
            throw new UserError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async getData(id: string, key: string): Promise<{data: string}> {
        try {
            return axios.get('http://localhost:7000/api/user/id?user_id=id',{headers:{"x-api-key":key}})
        } catch (e) {
            this.logger.error(e);
            throw new UserError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async getUserData(key: string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.get('http://localhost:7000/api/user/getUser',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new UserError(`Error occured. ${e}`, 'User.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/user/update',{haeders:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new UserError(`Error occurred. ${e}`, 'User.error');
        }
    }

    public async deleteData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/user/delete',{headers:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new UserError(`Error occurred. ${e}`, 'User.error');
        }
    }
}
