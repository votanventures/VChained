import {
  Body,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { EmployeeService } from "../services/EmployeeService";
import { EmployeeError } from "../dto/EmployeeError";

export abstract class EmployeeController {
  protected constructor(protected readonly service: EmployeeService) {}

  @Post("/create")
  async storeData(@Body() body: any, id: string, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new EmployeeError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Employee.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("id") id: string, body: any, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], id);
      return data;
    } catch (e) {
      throw new EmployeeError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Employee.error"
      );
    }
  }

  @Get("/getEmployee")
  async getEmployeeData(@Body("id") @Headers() header: object) {
    try {
      const data = await this.service.getEmployeeData(header["x-access-token"]);
      return data;
    } catch (e) {
      throw new EmployeeError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Employee.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body("id") id: string, @Headers() header: object) {
    try {
      const data = await this.service.updateData(header["x-access-token"], id);
      return data;
    } catch (e) {
      throw new EmployeeError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Employee.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Body() id: string, @Headers() header: object) {
    try {
      const data = await this.service.deleteData(header["x-access-token"], id);
      return data;
    } catch (e) {
      throw new EmployeeError(`Incompatible chain`, "deleteEmployee.error");
    }
  }
}
