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
import { IncomingService } from "../services/IncomingService";
import { IncomingError } from "../dto/IncomingError";
import { AddIncoming } from "../dto/AddIncoming";

export abstract class IncomingController {
  protected constructor(protected readonly service: IncomingService) {}

  @Post("/create")
  async storeData(@Body() body: AddIncoming, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new IncomingError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Incoming.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], user_id);
      return data;
    } catch (e) {
      throw new IncomingError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Incoming.error"
      );
    }
  }

  @Get("/getIncoming")
  async getIncomingData(@Headers() header: object) {
    try {
      const data = await this.service.getIncomingData(header["x-access-token"]);
      return data;
    } catch (e) {
      throw new IncomingError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Incoming.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(header["x-access-token"],body);
      return data;
    } catch (e) {
      throw new IncomingError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Incoming.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Query("productId") productId: string, @Headers() header: object) {
    try {
      const data = await this.service.deleteData(header["x-access-token"], productId);
      return data;
    } catch (e) {
      throw new IncomingError(`Incompatible chain`, "deleteIncoming.error");
    }
  }
}