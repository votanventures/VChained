import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { IncomingError } from "../dto/IncomingError";
import { CONSTANTS } from "../constants";
import { AddIncoming } from "../dto/AddIncoming";

export abstract class IncomingService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(key: string, body:AddIncoming): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/incoming/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new IncomingError(`Error occurred. ${e}`, "Incoming.error");
    }
  }

  public async getData(user_id: string, key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + `/incoming/id?user_id=${user_id}`, {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new IncomingError(`Error occurred ${e}`, "Incoming.error");
    }
  }

  public async getIncomingData(key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/incoming/getIncoming",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new IncomingError(`Error occurred ${e}`, "Incoming.error");
    }
  }

  public async updateData(key: string, body: any): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/incoming/update",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new IncomingError(`Error occurred. ${e}`, "Incoming.error");
    }
  }

  public async deleteData(key: string, productId:string): Promise<{ data: any }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/incoming/delete/id?productId=${productId}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new IncomingError(`Error occurred. ${e}`, "Incoming.error");
    }
  }
}
