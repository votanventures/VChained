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
import { ParticipantService } from "../services/ParticipantService";
import { ParticipantError } from "../dto/ParticipantError";
import { AddParticipient } from "../dto/AddParticipient";

export abstract class ParticipantController {
  protected constructor(protected readonly service: ParticipantService) {}

  @Post("/create")
  async storeData(@Body() body: AddParticipient, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"], body, header["netid"]);
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
      const data = await this.service.getData(header["x-access-token"], PID, header["netid"]);
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

  @Get("/getOParticipant/:PID")
  async getOParticipantByPid(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getOParticipantByPid(
        header["x-access-token"],      
        PID
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

  @Get("/:PID/notifications/delete")
  async getDeleteNotificationOne(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getDeleteNotificationOne(
        header["x-access-token"],      
        PID
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

  @Get("/:PID/notifications/deleteAll")
  async getDeleteNotificationAll(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getDeleteNotificationAll(
        header["x-access-token"],      
        PID
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

  @Post("/:PID/notifications/add")
  async DeleteNotificationAdd(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.DeleteNotificationAdd(
        header["x-access-token"],      
        PID
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

  @Post("/:PID/notifications/admin/add")
  async DeleteNotificationAdmin(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.DeleteNotificationAdmin(
        header["x-access-token"],      
        PID
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

  @Put("/update")
  async updateData(
    @Body() body:any,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        header["netid"],
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

  @Delete("/delete")
  async deleteData(
    @Query("PID") @Body() PID: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteData(
        header["x-access-token"],
        header["netid"],
        PID
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

  @Delete("/delete/PID")
  async deleteDataByPID(
    @Query("PID") @Body() PID: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteDataByPID(
        header["x-access-token"],
        header["netid"],
        PID
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
}
