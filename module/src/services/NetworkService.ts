import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { NetworkError } from "../dto/NetworkError";
import { CONSTANTS } from "../constants";
import { AddNetwork } from "../dto/AddNetwork";

export abstract class NetworkService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(body: any): Promise<{ data: any }> {
    try {
      
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/network/create",
        body
      );

      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async connectData(body: AddNetwork): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/network/connect",
        body
      );
      console.log(data, "data here...");
      console.log();
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async getData(user_id: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/network/id?user_id=${user_id}`
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async getNetworkData(): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/network/getNetwork"
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occured. ${e}`, "Network.error");
    }
  }

  public async getcheckStatusData(NID: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/network/id?NID=${NID}`
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }
  public async forgot(NID: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/network/forgot?NID=${NID}`
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }
  public async updateData(data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(CONSTANTS.VTraceApi + "/network/update");
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }

  public async deleteData(NID: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/network/delete/id?NId=${NID}`
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Network.error");
    }
  }
}
