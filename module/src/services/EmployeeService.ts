import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { EmployeeError } from "../dto/EmployeeError";
import { CONSTANTS } from "../constants";
import { AddEmployee } from "../dto/AddEmployee";

export abstract class EmployeeService {
  protected constructor(protected readonly logger: PinoLogger) {}

  public async storeData(key: string, body:AddEmployee): Promise<{ data: string }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/employee/create",body,
        { headers: { "x-access-token": key } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new EmployeeError(`Error occurred. ${e}`, "Employee.error");
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
      throw new EmployeeError(`Error occurred. ${e}`, "Employee.error");
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
      throw new EmployeeError(`Error occured. ${e}`, "Employee.error");
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
      throw new EmployeeError(`Error occurred. ${e}`, "Employee.error");
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
      throw new EmployeeError(`Error occurred. ${e}`, "Employee.error");
    }
  }
}
