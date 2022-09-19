import {
  Body,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile 
} from "@nestjs/common";
import { MasterService } from "../services/MasterService";
import { MasterError } from "../dto/MasterError";
import { AddMasterData } from "../dto/AddMasterData";
import { FileInterceptor } from "@nestjs/platform-express";
import { storage } from "../constants";

export abstract class MasterController {
  protected constructor(protected readonly service: MasterService) {}

  @Post("/create")
  async storeData(@Body() body: AddMasterData, @Headers() header: object) {
    try {
      const data = await this.service.storeData(header["x-access-token"],body);
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }
  @Post("/insertInventory")
  async insertInventory(@Body() body: any, @Headers() header: object) {
    try {
      const data = await this.service.insertInventory(header,body);
      return data;
    } catch (e) {
      console.log(e)
      throw new Error(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`
      );
    }
  }
  
  @Get("/id")
  async getData(@Query("user_id") user_id: string, @Headers() header: object) {
    try {
      const data = await this.service.getData(
        header["x-access-token"],
        user_id,
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Get("/getMasterData/:PID")
  async getAllProducts(@Param('PID') PID: string,  @Headers() header: object) {
    try {
      const data = await this.service.getMasterDataPid(
        header["x-access-token"],      
        PID
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occurred. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Inventory.error"
      );
    }
  }

  @Put("/update")
  async updateData(@Body() body:any, @Headers() header: object) {
    try {
      const data = await this.service.updateData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Put("/insert/batch")
  async insertBatchData(@Body("id") body: any, @Headers() header: object) {
    try {
      const data = await this.service.insertBatchData(
        header["x-access-token"],
        body
      );
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }

  @Put("insert/csv") // API path
  @UseInterceptors(
    FileInterceptor(
      "file", // name of the field being passed
      { storage }
    )
  )
  async upload(@UploadedFile() file) {
    try{
    if(file.mimetype === "text/csv"){
      const csvFilePath=file.path
      const csv=require('csvtojson')
        csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
          console.log(jsonObj);
        })
      const jsonArray = await csv().fromFile(csvFilePath);
      console.log(jsonArray,"json Array")  
      return file;
    } else{
      return {
        error: "Format not valid, please use csv files only"
      }
    }
    
    } catch(e){
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      );
    }
  }


  @Delete("/delete")
  async deleteData(@Headers() header: object, @Query("productId") productId:string) {
    try {
      const data = await this.service.deleteData(header["x-access-token"],productId);
      return data;
    } catch (e) {
      throw new MasterError(
        `Unexpected error occured. Reason: ${
          e.message?.message || e.response?.data || e.message || e
        }`,
        "Master.error"
      )
    }
  }
}
