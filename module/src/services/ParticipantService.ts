import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { ParticipantError } from "../dto/ParticipantError";
import { CONSTANTS } from "../constants";
import { AddParticipant } from "../dto/AddParticipant";

export abstract class ParticipantService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddParticipant
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/participant/create",
        body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }

  public async getData(id: string, key: string): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/participant/id",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred ${e}`, "Participant.error");
    }
  }

  public async getParticipentData(key: string): Promise<{ data: any }> {
    try {
        console.log(key,"keys123456789")
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/participant/getParticipant",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred ${e}`, "Participant.error");
    }
  }

  public async updateData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/participant/update",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }

  public async deleteData(key: string, data: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/participant/delete",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }
}
