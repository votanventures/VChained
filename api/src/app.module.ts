import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { EmpController, IncController, InvController, 
         MasController, ParController, RecController, 
         TransController, UsrController } from './app.controller';
import { EmpService, IncService, InvService, 
         MasService, ParService, RecService, 
         TransService, UsrService } from './app.service';


@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [EmpController, InvController, IncController, 
               MasController, ParController, MasController, 
               ParController, RecController, TransController, 
               UsrController],
  providers: [EmpService, InvService, IncService, 
              MasService, ParService, RecService, 
              TransService, UsrService],
})
export class AppModule {}
