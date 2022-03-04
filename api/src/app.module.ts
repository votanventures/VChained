import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { EmpController, IncController, InvController, 
         MasController, ParController, RecController, 
         TransController, UsrController, BlckController } from './app.controller';
import { EmpService, IncService, InvService, 
         MasService, ParService, RecService, 
         TransService, UsrService, BlckService } from './app.service';


@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [EmpController, InvController, IncController, 
               MasController, ParController, MasController, 
               ParController, RecController, TransController, 
               UsrController, BlckController],
  providers: [EmpService, IncService, InvService, 
              MasService, ParService, RecService, 
              TransService, UsrService, BlckService],
})
export class AppModule {}
