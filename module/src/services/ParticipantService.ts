import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { ParticipantError } from "../dto/ParticipantError";
import { CONSTANTS } from "../constants";
import { AddParticipient } from "../dto/AddParticipient";

export abstract class ParticipantService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(
    key: string,
    body: AddParticipient,
    netid: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/participant/create",
        body,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }

  public async getData(key: string, PID: string, netid: string): Promise<{ data: string }> {
    try {

      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/participant/id?PID=${PID}`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred ${e}`, "Participant.error");
    }
  }

  public async getAllParticipantByNid(
    key: string,
    NID: string,
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/participant/getParticipant/${NID}`,
        { headers: { "x-access-token": key, "netid": NID} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred ${e}`, "Participant.error");
    }
  }
  public async getAllOtherParticipantByNid(
    key: string,
    PID: string,
    NID: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/participant/getParticipant/${PID}`,
        { headers: { "x-access-token": key, "netid": NID} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred ${e}`, "Participant.error");
    }
  }

  public async updateData(key: string, netid: any, body: any): Promise<{ data: string }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/participant/update",
        body,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }


  public async deleteData(key: string, netid: string, PID: string ): Promise<{ data: string }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/participant/delete?PID=${PID}`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new ParticipantError(`Error occurred. ${e}`, "Participant.error");
    }
  }
}
