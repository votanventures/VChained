import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { InventoryError } from "../dto/InventoryError";
import { CONSTANTS } from "../constants";
import { AddInventory } from "../dto/AddInventory";

export abstract class InventoryService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddInventory
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/inventory/create",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async getData(id: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + "/inventory/id?user_id=id", {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getInventoryData(key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/inventory/getInventory",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getInventoryByPID(
    key: string,
    pid: string,
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/inventory/getInventory/${pid}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getOutgoingByPID(
    key: string,
    pid: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/inventory/getOutgoing/${pid}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getIncomingByPID(
    key: string,
    pid: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/inventory/getIncoming/${pid}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getPartsData(
    productID: string,
    pid:string,
    key: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/inventory/getParts?productID=${productID}&&pid=${pid}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getAllParts(key: string, productID: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/inventory/getAllParts?productID=${productID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async updateData(key: string, body: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/update",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async addSubPartData(
    key: string,
    body: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/addSubPart",
        body,
        { headers: { "x-access-token": key } }
      );

      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async removeSubPartData(
    key: string,
    body: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/removeSubPart",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async claimRejectData(
    key: string,
    body: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/claim/reject",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async claimAcceptData(
    key: string,
    body: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/claim/accept",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async updateBatchData(
    key: string,
    body: any
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/update/batch",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async insertBatchData(
    key: string,
    body: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/insert/batch",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }

  public async deleteData(key: string, data: any): Promise<{ data: any }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + "/inventory/delete",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred. ${e}`, "Inventory.error");
    }
  }
}
