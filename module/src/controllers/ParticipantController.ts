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
import { ParticipantService } from "../services/ParticipantService";
import { ParticipantError } from "../dto/ParticipantError";

export abstract class ParticipantController {
  protected constructor(protected readonly service: ParticipantService) {}

  @Post("/create")
  async storeData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body);
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("PID") PID: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(header["x-access-token"], PID);
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Get("/getParticipant")
  async getParticipentData(@Headers() header: object) {
    try {
      const data = await this.service.getParticipentData(
        header["x-access-token"]
      );
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Get("/getParticipant/:NID")
  async getAllParticipantByNid(@Param('NID') NID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getAllParticipantByNid(
        header["x-access-token"],      
        NID
      );
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Get("/getData")
  async getBlockchainData(@Body("PID") @Headers() header: object) {
    try {
      const data = await this.service.getBlockchainData(
        header["x-access-token"]
      );
      return data;
    } catch(e) {
      throw new ParticipantError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant error"
      )
    }
  }

  @Put("/update")
  async updateData(
    @Body() body:any,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Put("/updateData")
  async updateBlockchainData(@Body("PID") PID:string, @Headers() header:object) {
    try{
      const data = await this.service.updateBlockchainData(header["x-access-token"], PID);
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Participant.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(
    @Query("user_id") @Body() user_id: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new ParticipantError(
        `Incompatible chain`,
        "deleteParticipant.error"
      );
    }
  }
}
