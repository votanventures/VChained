import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { InventoryError } from '../dto/InventoryError';

export abstract class InventoryService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{data:string}> {
        try {
            const {data} = await axios.post('http://localhost:7000/api/inventory/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/inventory/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getInventoryData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get('http://localhost:7000/api/inventory/getInventory',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/inventory/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put('http://localhost:7000/api/inventory/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }
}