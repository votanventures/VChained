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
        CONSTANTS.VTraceApi + "/employee/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Employee.error");
    }
  }

  public async getData(user_id: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + `/employee/id?user_id=${user_id}`, {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Employee.error");
    }
  }

  public async getEmployeeData(key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/employee/getEmployee",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occured. ${e}`, "Employee.error");
    }
  }

  public async updateData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/employee/update",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Employee.error");
    }
  }

  public async deleteData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + "/employee/delete",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new NetworkError(`Error occurred. ${e}`, "Employee.error");
    }
  }
}
