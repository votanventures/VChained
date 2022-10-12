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
  async connectData(@Body() body: any) {
    try {
      const data = await this.service.connectData(body);
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
  async getData(@Query("NID") NID: string) {
    try {
      const data = await this.service.getByID(NID);
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
  async getNetwork(@Body() body: any) {
    try {
      const data = await this.service.getNetwork(body);
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
  async getcheckStatusData(@Query("NID") NID: string) {
    try {
      const data = await this.service.getcheckStatusData(NID);
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

  @Get("/forgot")
  async forget(@Query("NID") NID: string) {
    try {
      const data = await this.service.forgot(NID);
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
  async updateData(@Body() body:any) {
    try {
      const data = await this.service.updateData(body);
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
  async deleteData(@Query("NID") NID: string) {
    try {
      const data = await this.service.deleteData(NID);
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
