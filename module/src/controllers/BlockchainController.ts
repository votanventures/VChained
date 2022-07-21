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
import axios from "axios";

export abstract class BlockchainController {
  protected constructor(protected readonly service: BlockchainService) {}

  // get contract key by blockchain data
    @Get("/get/:contract/:key")
    async getByID(@Param() p) {
      try {
        // const data = await this.service.deploy(header["x-api-key"],p);
        const { data } = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${p.contract}/bigmaps/identities/keys/${p.key}`)
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
  @Get("/history/:contract/:key")
  async getHistory(@Param() p) {
    try {
      const { data } = await axios.get(`https://api.ghostnet.tzkt.io/v1/contracts/${p.contract}/bigmaps/identities/keys/${p.key}/updates`)
      console.log(p,"params in contracr")
      console.log(data,"blockchain data")
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
  async deploy(@Headers() header: object, @Param('PID') p) {
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
  // user
  @Post("/user")
  async createUser(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.updateUser(body);
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
  // create
  @Post("/create")
  async create(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.create(body);
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

  // update
  @Put("/update")
  async update(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.update(body);
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
