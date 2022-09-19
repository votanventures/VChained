import {
  Body,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Delete,
  Query
} from "@nestjs/common";
import { InventoryService } from "../services/InventoryService";
import { InventoryError } from "../dto/InventoryError";
import { AddInventory } from "../dto/AddInventory";
import { BlockchainService } from "../services/BlockchainServices";

export abstract class InventoryController {
  protected constructor(protected readonly service: InventoryService, 
  protected readonly blockchain: BlockchainService
  ) {}

  @Post("/create")
  async storeData(@Body() body: AddInventory, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Post("/club")
  async clubData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.clubData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], user_id);
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getInventory")
  async getUserData(@Headers() header: object) {
    try {
      const data = await this.service.getInventoryData(
        header["x-access-token"]
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getProducts/:PID")
  async getAllProducts(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getAllProducts(
        header["x-access-token"],      
        PID
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getInventory/:pid")
  async getInventoryByPID(@Param('pid') pid: string, @Headers() header: object) {
    try {
      const data = await this.service.getInventoryByPID(
        header["x-access-token"],
        pid
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getOutgoing/:pid")
  async getOutgoingByPID(@Param('pid') pid: string, @Headers() header: object) {
    try {
      const data = await this.service.getOutgoingByPID(
        header["x-access-token"],
        pid
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getIncoming/:pid")
  async getIncomingByPID(@Param('pid') pid: string, @Headers() header: object) {
    try {
      const data = await this.service.getIncomingByPID(
        header["x-access-token"],
        pid
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getParts")
  async getPartsData(@Query("productID") productID:string, @Query("pid") pid:string, @Headers() header: object) {
    try {
      const data = await this.service.getPartsData(
        productID,pid, header["x-access-token"]
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Get("/getAllParts")
  async getAllParts(@Headers() header: object, @Query("productID") productID:string) {
    try {
      const data = await this.service.getAllParts(
        header["x-access-token"],
        productID
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body() body: any, @Headers() header: object) {
    try {
      console.log(body,"body here")
      const data = await this.service.updateData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/addSubPart")
  async addSubPartData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.addSubPartData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/removeSubPart")
  async removeSubPartData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.removeSubPartData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/claim/reject")
  async claimRejectData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.claimRejectData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/claim/accept")
  async claimAcceptData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.claimAcceptData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/update/batch")
  async updateBatchData(@Body() body:any, @Headers() header: object) {
    try {

      const data = await this.service.updateBatchData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/insert/batch")
  async insertBatchData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.insertBatchData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new InventoryError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Query("id") id: string, @Body() @Headers() header: object) {
    try {
      const data = await this.service.deleteData(header["x-access-token"], id);
      return data;
    } catch (e) {
      throw new InventoryError(`Incompatible chain`, "deleteInventory.error");
    }
  }
}
