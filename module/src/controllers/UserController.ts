import {
  Body,
  Get,
  Headers,
  Post,
  Put,
  Delete,
  Query,
} from "@nestjs/common";
import { UserService } from "../services/UserService";
import { UserError } from "../dto/UserError";

export abstract class UserController {
  protected constructor(protected readonly service: UserService) {}
  
  @Post("/register")
  async signupData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.signupData(
        body,
        header["x-access-token"],
        header["netid"],
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
  async loginData(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.loginData(header["x-access-token"],header["netid"],body);
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
        header["netid"],
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
  async getUser(@Headers() header: object) {
    try {
      const data = await this.service.getUser(
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

  @Get("/reset")
  async resetPassword(
    @Query("email") email: string, @Headers() header: object
  ) {
    try {
      const data = await this.service.resetPassword(
        email,
        header["x-access-token"],
        header["netid"],
      );
      console.log(data,"data from user controller")
      return data;
    } catch (e) {
      console.log(e)
      throw new UserError(`Unable to reach servers, please try again later`, "user.error");
    }
  }

  @Put("/update")
  async updateData(
    @Body() body: string,
    @Headers() header: object
  ) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        body,
        header["netid"],
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
    @Headers() header: object
  ) {
    try {
      const data = await this.service.deleteData(
        header["x-access-token"],
        header["netid"],
        user_id
      );
      return data;
    } catch (e) {
      throw new UserError(`Incompatible chain`, "deleteUser.error");
    }
  }
}
