import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { MasterError } from "../dto/MasterError";
import { CONSTANTS } from "../constants";
import { AddMasterData } from "../dto/AddMasterData";

export abstract class MasterService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddMasterData
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/masterdata/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }
  
  public async insertInventory(
    header: any,
    body: any
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/masterdata/PID/:PID/insertInventory",body,
        { headers: header }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`Error occurred. ${e}`);
    }
  }

  public async getMasterData(
    key: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/masterdata/getMasterData",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred ${e}`, "Master.error");
    }
  }
  public async getMasterDataPid(
    key: string,
    PID: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/masterdata/getMasterData/${PID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred ${e}`, "Master.error");
    }
  }

  public async updateData(
    key: string,
    body:any
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/masterdata/update",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }

  public async insertBatchData(
    key: string,
    body: AddMasterData
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/masterdata/insert/batch",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }

  public async deleteData(key: string, productId:string): Promise<{ data: string }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/masterdata/PID/:PID/delete?productId=${productId}`,{
          headers: { "x-access-token": key } },
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new MasterError(`Error occurred. ${e}`, "Master.error");
    }
  }
}
