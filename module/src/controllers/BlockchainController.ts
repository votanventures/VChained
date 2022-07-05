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
import { BlockchainService } from "../services/BlockchainServices";
import { BlockchainError } from "../dto/BlockchainError";

export abstract class BlockchainController {
  protected constructor(protected readonly service: BlockchainService) {}

  @Get("/deploy/:user_id")
  async deploy(@Headers() header: object, @Param('user_id') p) {
    try {
      console.log(header)
      const data = await this.service.deploy(header["x-api-key"],p);
      return data;
    } catch (e) {
      throw new BlockchainError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Blockchain.error"
      );
    }
  }
  @Post("/create")
  async create(@Body() body: any, @Headers() header: object) {
    try {
      const { data } = await this.service.create(body);
      return data;
    } catch (e) {
      throw new BlockchainError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Blockchain.error"
      );
    }
  }
  @Post("/update")
  async update(@Body() body: any, @Headers() header: object) {
    try {
      const { data } = await this.service.update(body);
      return data;
    } catch (e) {
      throw new BlockchainError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Blockchain.error"
      );
    }
  }
}
