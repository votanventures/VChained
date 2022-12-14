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
  ): Promise<{ data: any }> {
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

  public async getData(user_id:string, key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/transaction/id?user_id=${user_id}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async getTransactionData(key: string, PID:string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/transaction/getTransaction/${PID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async getTransactionId(key: string, txID:string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/transaction/${txID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async getProductById(key: string, productID:string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/transaction/${productID}`,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred ${e}`, "Transaction.error");
    }
  }

  public async getProduct(key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/transaction/product`,
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
  ): Promise<{ data: any }> {
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

  public async deleteData(key: string, id: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + "/transaction/delete",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new TransactionError(`Error occurred. ${e}`, "Transaction.error");
    }
  }
}
