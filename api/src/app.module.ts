import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { NetController, IncController, InvController, 
         MasController, ParController, RecController, 
         TransController, UsrController, BlckController } from './app.controller';
import { NetService, IncService, InvService, 
         MasService, ParService, RecService, 
         TransService, UsrService, BlckService } from './app.service';


@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [NetController, InvController, IncController, 
               MasController, ParController, MasController, 
               ParController, RecController, TransController, 
               UsrController, BlckController],
  providers: [NetService, IncService, InvService, 
              MasService, ParService, RecService, 
              TransService, UsrService, BlckService],
})
export class AppModule {}
