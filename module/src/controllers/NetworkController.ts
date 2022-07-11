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
import { NetworkService } from "../services/NetworkService";
import { NetworkError } from "../dto/NetworkError";
import { AddNetwork } from "../dto/AddNetwork";

export abstract class NetworkController {
  protected constructor(protected readonly service: NetworkService) {}

  @Post("/create")
  async storeData(@Body() body: AddNetwork) {
    try {
      const data = await this.service.storeData(body);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Post("/connect")
  async connectData(@Body() body: AddNetwork, @Headers() header: object) {
    try {
      const data = await this.service.connectData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("NID") NID: string, body: any, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], NID);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Get("/getNetwork")
  async getNetworkData() {
    try {
      const data = await this.service.getNetworkData();
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Get("/checkStatus")
  async getcheckStatusData(@Query("NID") NID: string, @Headers() header: object) {
    try {
      const data = await this.service.getcheckStatusData(header["x-access-token"], NID);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Query("NID") NID: string, @Headers() header: object) {
    try {
      const data = await this.service.deleteData(header["x-access-token"], NID);
      return data;
    } catch (e) {
      throw new NetworkError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Network.error"
      )
    }
  }
}
