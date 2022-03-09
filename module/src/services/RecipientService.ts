import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { RecipientError } from '../dto/RecipientError';
import { CONSTANTS } from '../constants';


export abstract class RecipientService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any, url: string): Promise<{ data: string }> {
        try {
            const {data} = await axios.post(CONSTANTS.VTraceApi+'/recipient/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }


    public async getData(id: string, key: string, data:any): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/recipient/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred ${e}`, 'Recipient.error');
        }
    }

    public async getRecipientData(key: string, data:any, id: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/recipient/getRecipient',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred ${e}`, 'Recipient.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/recipient/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/recipient/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }
}