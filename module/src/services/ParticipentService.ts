import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { ParticipentError } from '../dto/ParticipentError';
import { CONSTANTS } from '../constants';


export abstract class ParticipentService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            const {data} = await axios.post(CONSTANTS.VTraceApi+'/recipient/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/participent/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred ${e}`, 'Participent.error');
        }
    }

    public async getParticipentData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/participent/getParticipent',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred ${e}`, 'Participent.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/participent/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/participent/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }
}