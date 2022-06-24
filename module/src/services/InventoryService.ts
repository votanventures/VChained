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
      const { data } = await axios.get(CONSTANTS.VTraceApi + "/inventory/id", {
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
      console.log(data,"inventory data here 1234578")
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
        CONSTANTS.VTraceApi + "/inventory/getOutgoing/:pid",
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
        CONSTANTS.VTraceApi + "/inventory/getIncoming/:pid",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getPartsData(
    id: string,
    key: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/inventory/getParts",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async getAllParts(id: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/inventory/getAllParts",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new InventoryError(`Error occurred ${e}`, "Inventory.error");
    }
  }

  public async updateData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/update",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/addSubPart",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/removeSubPart",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/claim/reject",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/claim/reject",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/update/batch",
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
    data: any
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/inventory/insert/batch",
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
      const { data } = await axios.put(
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
