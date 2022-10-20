import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { CONSTANTS } from "../constants";
import { BlockchainError } from "../dto/BlockchainError";

export class BlockchainService {
  protected constructor(protected readonly logger: PinoLogger) {
  }
 
  public async getDatabyKey(
    key: string,
    id: string,
    NID: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/get/${id}`,
        { headers: { "x-access-token": key, "netid": NID } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }
 
  public async getHistoryDatabyKey(
    key: string,
    id: string,
    NID: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/history/${id}`,
        { headers: { "x-access-token": key, "netid": NID } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }
 
  public async deploy(
    key:string,
    netid: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/deploy/${netid}`,
        { headers: { "x-access-token": key, "netid": netid } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }

  public async getProduct(
    body:any,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/getProduct`,body
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }

  public async write(
    key: string,
    body: any,
    netid: string
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/ledger/create",body,
        { headers: { "x-access-token": key, "netid": netid } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred. ${e}`, "Blockchain.error");
    }
  }
}
