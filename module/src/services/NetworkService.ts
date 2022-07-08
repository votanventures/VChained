import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { NetworkError } from "../dto/NetworkError";
import { CONSTANTS } from "../constants";
import { AddNetwork } from "../dto/AddNetwork";

export abstract class NetworkService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(key: string, body:AddNetwork): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/network/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async connectData(key: string, body:AddNetwork): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/network/connect",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async getData(user_id: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + `/network/id?user_id=${user_id}`, {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async getNetworkData(key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/network/getNetwork",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occured. ${e}`, "Network.error");
    }
  }

  public async getcheckStatusData(NID: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + `/network/id?NID=${NID}`, {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async updateData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/network/update",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async deleteData(key: string, NID:string): Promise<{ data: string }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/network/delete/id?NId=${NID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }
}
