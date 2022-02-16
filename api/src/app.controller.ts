import { Controller } from '@nestjs/common';
import { EmpService, IncService, InvService, MasService, ParService, RecService, TransService, UsrService } from './app.service';
import { EmployeeController } from '../../module/src/controllers/EmployeeController';
import { IncomingController } from '../../module/src/controllers/IncomingController';
import { InventoryController } from '../../module/src/controllers/InventoryController';
import { MasterController } from '../../module/src/controllers/MasterController';
import { ParticipientController } from '../../module/src/controllers/ParticipientController';
import { RecipientController } from '../../module/src/controllers/RecipientController';
import { TransactionController } from '../../module/src/controllers/TransactionController';
import { UserController } from '../../module/src/controllers/UserController';

@Controller('/employee')
export class EmpController extends EmployeeController {
  constructor(private readonly quorumService: EmpService) {
    super(quorumService);
  }
}
@Controller('/incoming')
export class IncController extends IncomingController {
  constructor(private readonly quorumService: IncService) {
    super(quorumService);
  }
}
@Controller('/inventory')
export class InvController extends InventoryController {
  constructor(private readonly quorumService: InvService) {
    super(quorumService);
  }
}
@Controller('/masterdata')
export class MasController extends MasterController {
  constructor(private readonly quorumService: MasService) {
    super(quorumService);
  }
}
@Controller('/participent')
export class ParController extends ParticipientController {
  constructor(private readonly quorumService: ParService) {
    super(quorumService);
  }
}
@Controller('/recipient')
export class RecController extends RecipientController {
  constructor(private readonly quorumService: RecService) {
    super(quorumService);
  }
}
@Controller('/transaction')
export class TransController extends TransactionController {
  constructor(private readonly quorumService: TransService) {
    super(quorumService);
  }
}
@Controller('/user')
export class UsrController extends UserController {
  constructor(private readonly quorumService: UsrService) {
    super(quorumService);
  }
}
