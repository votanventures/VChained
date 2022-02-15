import { Controller } from '@nestjs/common';
import { EmpService, InvService } from './app.service';
import { EmployeeController } from '../../module/src/controllers/EmployeeController';
import { InventoryController } from '../../module/src/controllers/InventoryController';

@Controller('/employee')
export class EmpController extends EmployeeController {
  constructor(private readonly quorumService: EmpService) {
    super(quorumService);
  }
}
@Controller('/inventory')
export class InvController extends InventoryController {
  constructor(private readonly quorumService: InvService) {
    super(quorumService);
  }
}

