import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { MasterError } from '../dto/MasterError';

export abstract class MasterService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any, url: string): Promise<{ data: string }> {
        try {
            return axios.post('http://localhost:7000/api/masterdata/create',{headres:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }


    public async getData(id: string, key: string, data:any): Promise<{data:string}> {
        try{
            return axios.get('http://localhost:7000/api/masterdata/id',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred ${e}`, 'Master.error');
        }
    }

    public async getMasterData(key: string, data:any, id: string): Promise<{data:string}> {
        try{
            return axios.get('http://localhost:7000/api/masterdata/getInventory',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred ${e}`, 'Master.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/masterdata/update',{haeders:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }

    public async deleteData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/masterdata/delete',{headers:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }
}