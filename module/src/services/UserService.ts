import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { UserError } from "../dto/UserError";
import { CONSTANTS } from "../constants";
import { CreateUser } from "../dto/CreateUser";

export abstract class UserService {
  protected constructor(protected readonly logger: PinoLogger) {}

  // public async storeData(body: CreateUser,key: string): Promise<{ data: string }> {
  //     try {
  //         const {data} = await axios.post(CONSTANTS.VTraceApi+'/user/create',body,{headers:{"x-api-key":key}})
  //         return data;
  //     } catch(e) {
  //         this.logger.error(e);
  //         throw new UserError(`Error occurred. ${e}`, 'User.error');
  //     }
  // }

  public async signupData(
    key: string,
    body: CreateUser
  ): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/user/register",
        body,
        { headers: { "x-api-key": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async loginData(
    body: CreateUser
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/user/login",
        body
      );
      console.log("hello", data);
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async getData(id: string, key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/user/id?user_id=id",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async getUserData(key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + "/user/getUser", {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occured. ${e}`, "User.error");
    }
  }

  public async getBlockchainData(key: string): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(CONSTANTS.VTraceApi + "/user/getData", {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occured. ${e}`, "User.error");
    }
  }

  public async updateData(key: string, data: any): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(CONSTANTS.VTraceApi + "/user/update", {
        headers: { "x-access-token": key },
      });
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }

  public async updateBlockchainData(
    key: string,
    data: any
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + "/user/updateData",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occured. ${e}`, "User.error");
    }
  }

  public async deleteData(key: string, data: any): Promise<{ data: any }> {
    try {
      const { data } = await axios.put(
        CONSTANTS.VTraceApi + "/user/delete/id?user_id=id",
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new UserError(`Error occurred. ${e}`, "User.error");
    }
  }
}
