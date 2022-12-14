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
import { TransactionService } from "../services/TransactionService";
import { TransactionError } from "../dto/TransactionError";
import { AddTransaction } from "../dto/AddTransactions";

export abstract class TransactionController {
  protected constructor(protected readonly service: TransactionService) {}

  @Post("/create")
  async storeData(@Body() body: AddTransaction, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"],user_id);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Get("/getTransaction/:PID")
  async getUserData(@Headers() header: object, @Param("PID") PID: string) {
    try {
      const data = await this.service.getTransactionData(header["x-access-token"],PID);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Get("/:txId")
  async getTransactionId(@Headers() header: object, @Param("txID") txID: string) {
    try {
      const data = await this.service.getTransactionId(header["x-access-token"],txID);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Get("/:productId")
  async getProductById(@Headers() header: object, @Param("productId") productId: string) {
    try {
      const data = await this.service.getProductById(header["x-access-token"],productId);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Get("/product")
  async getProduct(@Headers() header: object) {
    try {
      const data = await this.service.getProduct(header["x-access-token"]);
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }


  @Put("/update")
  async updateData(
    @Body() body: any,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new TransactionError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Transaction.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(@Headers() header: object, @Query("id") id: string) {
    try {
      const data = await this.service.deleteData(header["x-access-token"], id);
      return data;
    } catch (e) {
      throw new TransactionError(`Incompatible chain`, "deleteUser.error");
    }
  }
}
