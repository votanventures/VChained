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
import { UserService } from "../services/UserService";
import { UserError } from "../dto/UserError";

export abstract class UserController {
  protected constructor(protected readonly service: UserService) {}

  
  @Post("/register")
  async signupData(@Body() body: any) {
    try {
      const data = await this.service.signupData(
        body,
      );
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Post("/login")
  async loginData(@Body() body: any) {
    try {
      const data = await this.service.loginData(body);
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Get("/id")
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Get("/getUser")
  async getUserData(@Headers() header: object) {
    try {
      const data = await this.service.getUserData(header["x-access-token"]);
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Get("/getData")
  async getBlockchainData(@Body("user_id") @Headers() header: object) {
    try {
      const data = await this.service.getBlockchainData(
        header["x-access-token"]
      );
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Put("/update")
  async updateData(
    @Body("user_id") user_id: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Put("/updateData")
  async updateBlockchainData(
    @Body("user_id") user_id: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateBlockchainData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new UserError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "User.error"
      );
    }
  }

  @Delete("/delete")
  async deleteData(
    @Query("user_id") user_id: string,
    @Body() @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteData(
        header["x-access-token"],
        user_id
      );
      return data;
    } catch (e) {
      throw new UserError(`Incompatible chain`, "deleteUser.error");
    }
  }
  @Get("/reset")
  async resetPassword(
    @Query("email") email: string
  ) {
    try {
      const data = await this.service.resetPassword(
        email
      );
      console.log(data,"data from user controller")
      return data;
    } catch (e) {
      console.log(e)
      throw new UserError(`Unable to reach servers, please try again later`, "user.error");
    }
  }
}
