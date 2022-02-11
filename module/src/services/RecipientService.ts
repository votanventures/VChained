import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { RecipientError } from '../dto/RecipientError';

export abstract class RecipientService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any, url: string): Promise<{ data: string }> {
        try {
            return axios.post('http://localhost:7000/api/recipient/create',{headres:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }


    public async getData(id: string, key: string, data:any): Promise<{data:string}> {
        try{
            return axios.get('http://localhost:7000/api/recipient/id',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred ${e}`, 'Recipient.error');
        }
    }

    public async getRecipientData(key: string, data:any, id: string): Promise<{data:string}> {
        try{
            return axios.get('http://localhost:7000/api/recipient/getRecipient',{headers:{"x-api-key":key}})
        } catch(e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred ${e}`, 'Recipient.error');
        }
    }

    public async updateData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/recipient/update',{haeders:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }

    public async deleteData(key:string, data:any, id: string): Promise<{data: string}> {
        try {
            return axios.put('http://localhost:7000/api/recipient/delete',{headers:{"x-api-key":key}},data)
        } catch (e) {
            this.logger.error(e);
            throw new RecipientError(`Error occurred. ${e}`, 'Recipient.error');
        }
    }
}