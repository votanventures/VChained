import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { TransactionError } from "../dto/TransactionError";
import { CONSTANTS } from "../constants";
import { AddTransaction } from "../dto/AddTransactions";

export abstract class TransactionService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddTransaction
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/transaction/create",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred. ${e}`, "Transaction.error");
    }
  }

  public async getData(user_id:string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/transaction/id?user_id=id",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async getTransactionData(key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/transaction/getTransaction",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async updateData(
    key: string,
    body: AddTransaction,
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/transaction/update",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred. ${e}`, "Transaction.error");
    }
  }

  public async deleteData(key: string, id: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/transaction/delete",
        id,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred. ${e}`, "Transaction.error");
    }
  }
}
