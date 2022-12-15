import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { UserError } from "../dto/UserError";
import { CONSTANTS } from "../constants";
import { CreateUser } from "../dto/CreateUser";

export abstract class UserService {
  protected constructor(protected readonly logger: PinoLogger) {}
  
  public async signupData(
    body: CreateUser,
    key: string,
    netid: string
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/user/register",
        body,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async loginData(
    key: string,
    netid: string,
    body: CreateUser,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/user/login",
        body,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async getData(key: string,netid: string,user_id: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/user/id?user_id=${user_id}`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async getDataByPID(key: string, netid: string, PID: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/user/PID/${PID}/get`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async getUser(key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/user/getUser`,
        { headers: { "x-access-token": key} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async resetPassword(email: string, key: string, netid: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/user/reset?email=${email}`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      console.log(data,"data from user service")
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async updateData(key: string, body: any, netid: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(CONSTANTS.VTraceApi + "/user/update", body, 
      { headers: { "x-access-token": key, "netid": netid} });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }


  public async deleteData(key: string, netid:string, user_id:string): Promise<{ data: any }> {
    try {
      const { data } = await axios.delete(
        CONSTANTS.VTraceApi + `/user/delete/id?user_id=${user_id}`,
        { headers: { "x-access-token": key, "netid": netid} }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }
}
