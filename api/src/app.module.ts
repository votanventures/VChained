import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { EmpController, InvController } from './app.controller';
import { EmpService, InvService } from './app.service';

@Module({
  imports: [LoggerModule.forRoot()],
  controllers: [EmpController, InvController],
  providers: [EmpService, InvService],
})
export class AppModule {}
