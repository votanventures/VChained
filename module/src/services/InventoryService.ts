import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { InventoryError } from '../dto/InventoryError';
import { CONSTANTS } from '../constants';


export abstract class InventoryService {

    protected constructor(protected readonly logger: PinoLogger) {

    }

    public async storeData(key: string, data: any): Promise<{data:string}> {
        try {
            const {data} = await axios.post(CONSTANTS.VTraceApi+'/inventory/create',{headres:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }


    public async getData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/id',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getInventoryData(key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getInventory',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getInventoryByPID(key: string, pid: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getInventory/:pid',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getOutgoingByPID(key: string, pid:string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getOutgoing/:pid',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getIncomingByPID(key: string, pid:string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getIncoming/:pid',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getPartsData(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getParts',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async getAllParts(id: string, key: string): Promise<{data:string}> {
        try{
            const {data} = await axios.get(CONSTANTS.VTraceApi+'/inventory/getAllParts',{headers:{"x-api-key":key}})
            return data;
        } catch(e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred ${e}`, 'Inventory.error');
        }
    }

    public async updateData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/update',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async addSubPartData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/addSubPart',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async removeSubPartData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/removeSubPart',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async claimRejectData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/claim/reject',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async claimAcceptData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/claim/reject',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async updateBatchData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/update/batch',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async insertBatchData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/insert/batch',{haeders:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }

    public async deleteData(key:string, data:any): Promise<{data: string}> {
        try {
            const {data} = await axios.put(CONSTANTS.VTraceApi+'/inventory/delete',{headers:{"x-api-key":key}})
            return data;
        } catch (e) {
            this.logger.error(e);
            throw new InventoryError(`Error occurred. ${e}`, 'Inventory.error');
        }
    }
}