import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { IncomingError } from '../dto/IncomingError';

export abstract class IncomingService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            const {data} = await axios.post('http://localhost:7000/api/incoming/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new IncomingError(`Error occurred. ${e}`, 'Incoming.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/incoming/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new IncomingError(`Error occurred ${e}`, 'Incoming.error');
        }
    }

    public async getIncomingData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/incoming/getIncoming',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new IncomingError(`Error occurred ${e}`, 'Incoming.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/incoming/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new IncomingError(`Error occurred. ${e}`, 'Incoming.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/incoming/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new IncomingError(`Error occurred. ${e}`, 'Incoming.error');
        }
    }
}