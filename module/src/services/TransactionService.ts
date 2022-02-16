import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { TransactionError } from '../dto/TransactionError';

export abstract class TransactionService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{ data: string }> {
        try {
            const {data} = await axios.post('http://localhost:7000/api/transaction/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new TransactionError(`Error occurred. ${e}`, 'Transaction.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/transaction/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new TransactionError(`Error occurred ${e}`, 'Transaction.error');
        }
    }

    public async getMasterData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/transaction/getTransaction',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new TransactionError(`Error occurred ${e}`, 'Transaction.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/transaction/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new TransactionError(`Error occurred. ${e}`, 'Transaction.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/transaction/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new TransactionError(`Error occurred. ${e}`, 'Transaction.error');
        }
    }
}