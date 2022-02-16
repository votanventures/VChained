import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { ParticipentError } from '../dto/ParticipentError';

export abstract class ParticipentService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            const {data} = await axios.post('http://localhost:7000/api/recipient/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/participent/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred ${e}`, 'Participent.error');
        }
    }

    public async getParticipentData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/participent/getParticipent',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred ${e}`, 'Participent.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/participent/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/participent/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new ParticipentError(`Error occurred. ${e}`, 'Participent.error');
        }
    }
}