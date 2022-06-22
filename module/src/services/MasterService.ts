import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { MasterError } from '../dto/MasterError';
import { CONSTANTS } from '../constants';
import { AddMasterData } from '../dto/AddMasterData';


export abstract class MasterService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, body:AddMasterData): Promise<{ data: string }> {
        try {
            const {data} = await axios.post(CONSTANTS.VTraceApi+'/masterdata/create', body, {headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }


    public async getData(id: string, key: string, data:any): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/masterdata/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred ${e}`, 'Master.error');
        }
    }

    public async getMasterData(key: string, data:any, id: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/masterdata/getMasterData',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred ${e}`, 'Master.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/masterdata/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }

    public async insertBatchData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/masterdata/insert/batch',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/masterdata/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new MasterError(`Error occurred. ${e}`, 'Master.error');
        }
    }
}