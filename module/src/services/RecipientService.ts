import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { RecipientError } from "../dto/RecipientError";
import { CONSTANTS } from "../constants";
import { AddRecipient } from "../dto/AddRecipient";

export abstract class RecipientService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddRecipient
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/recipient/create",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new RecipientError(`Error occurred. ${e}`, "Recipient.error");
    }
  }

  public async getData(user_id: string, key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + `/recipient/id/${user_id}`, {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new RecipientError(`Error occurred ${e}`, "Recipient.error");
    }
  }

  public async getRecipientData(
    key: string
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/recipient/getRecipient",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new RecipientError(`Error occurred ${e}`, "Recipient.error");
    }
  }

  public async updateData(
    key: string,
    body: AddRecipient
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/recipient/update",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new RecipientError(`Error occurred. ${e}`, "Recipient.error");
    }
  }

  public async deleteData(key: string, id: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + "/recipient/delete",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new RecipientError(`Error occurred. ${e}`, "Recipient.error");
    }
  }
}
