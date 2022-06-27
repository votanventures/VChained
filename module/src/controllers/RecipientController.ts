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
import { RecipientService } from "../services/RecipientService";
import { RecipientError } from "../dto/RecipientError";

export abstract class RecipientController {
  protected constructor(protected readonly service: RecipientService) {}

  @Post("/create")
  async storeData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new RecipientError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Recipient.error"
      );
    }
  }

  @Get("/id")
  async getData(@Param("user_id") user_id: string, body: any, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], user_id);
      return data;
    } catch (e) {
      throw new RecipientError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Recipient.error"
      );
    }
  }

  @Get("/getRecipient")
  async getRecipientData(
    @Headers() header: object
  ) {
    try {
      const data = await this.service.getRecipientData(
        header["x-access-token"],
      );
      return data;
    } catch (e) {
      throw new RecipientError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Recipient.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new RecipientError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Recipient.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(
    @Query("user_id") user_id: string, @Body() body:any,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new RecipientError(`Incompatible chain`, "deleteUser.error");
    }
  }
}
