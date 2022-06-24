import {
  Body,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { MasterService } from "../services/MasterService";
import { MasterError } from "../dto/MasterError";
import { AddMasterData } from "../dto/AddMasterData";

export abstract class MasterController {
  protected constructor(protected readonly service: MasterService) {}

  @Post("/create")
  async storeData(@Body() body: AddMasterData, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"],body);
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("id") id: string, body: any, @Headers() header: object) {
    try {
      const data = await this.service.getData(
        header["x-access-token"],
        id,
        body
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Get("/getMasterData")
  async getUserData(
    @Body("id") id: string,
    body: any,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.getMasterData(
        header["x-access-token"],
        id,
        body
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body("id") body: any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(
        body,
        header["x-access-token"]
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Put("/insert/batch")
  async insertBatchData(@Body("id") body: any, @Headers() header: object) {
    try {
      const data = await this.service.insertBatchData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Body() body: AddMasterData, @Headers() header: object) {
    try {
      const data = await this.service.deleteData(header["x-access-token"],body);
      return data;
    } catch (e) {
      throw new MasterError(`Incompatible chain`, "deleteUser.error");
    }
  }
}
