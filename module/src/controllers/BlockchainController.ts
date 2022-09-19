import { Body, Get, Headers, Param, Post, Put } from "@nestjs/common";
import { BlockchainService } from "../services/BlockchainServices";
import { BlockchainError } from "../dto/BlockchainError";

export abstract class BlockchainController {
  protected constructor(protected readonly service: BlockchainService) {}

  // get contract key by blockchain data
  @Get("/get/:key")
  async getByID(@Headers() header: object, @Param("key") key) {
    try {
      const { data } = await this.service.getDatabyKey(
        header["x-api-key"],
        key,
        header["netid"]
      );
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

  // get history by blockchain data by key
  @Get("/history/:key")
  async getHistoryByID(@Headers() header: object, @Param("key") key) {
    try {
      const { data } = await this.service.getDatabyKey(
        header["x-api-key"],
        key,
        header["netid"]
      );
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
  // get participant by blockchain data deploy
  @Get("/deploy/:PID")
  async deploy(@Headers() header: object, @Param("PID") p) {
    try {
      console.log(header);
      const data = await this.service.deploy(header["x-api-key"], p);
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
      const data = await this.service.write(header["x-api-key"],body,header["netid"]);
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
