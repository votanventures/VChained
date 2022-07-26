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
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(
        header["x-access-token"],
        user_id,
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
  async getMasterData(
    @Headers() header: object
  ) {
    try {
      const data = await this.service.getMasterData(
        header["x-access-token"],
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
  @Get("/getMasterData/:PID")
  async getAllProducts(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getMasterDataPid(
        header["x-access-token"],      
        PID
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }
  @Put("/update")
  async updateData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(
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
  async deleteData(@Headers() header: object, @Query("productId") productId:string) {
    try {
      const data = await this.service.deleteData(header["x-access-token"],productId);
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      )
    }
  }
}
