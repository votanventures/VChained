import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { EmployeeService } from '../../module/src/services/EmployeeService';
import { InventoryService } from '../../module/src/services/InventoryService';

@Injectable()
export class EmpService extends EmployeeService {
  constructor(@InjectPinoLogger(EmpService.name) logger: PinoLogger) {
    super(logger);
  }
}
export class InvService extends InventoryService {
  constructor(@InjectPinoLogger(InvService.name) logger: PinoLogger) {
    super(logger);
  }
}