import { Controller } from '@nestjs/common';
import { EmpService, IncService, InvService, MasService, ParService, RecService, TransService, UsrService, BlckService } from './app.service';
import { EmployeeController } from '../../module/src/controllers/EmployeeController';
import { IncomingController } from '../../module/src/controllers/IncomingController';
import { InventoryController } from '../../module/src/controllers/InventoryController';
import { MasterController } from '../../module/src/controllers/MasterController';
import { ParticipantController } from '../../module/src/controllers/ParticipantController';
import { RecipientController } from '../../module/src/controllers/RecipientController';
import { TransactionController } from '../../module/src/controllers/TransactionController';
import { UserController } from '../../module/src/controllers/UserController';
import { BlockchainController } from '../../module/src/controllers/BlockchainController';

@Controller('/api/employee')
export class EmpController extends EmployeeController {
  constructor(private readonly quorumService: EmpService) {
    super(quorumService);
  }
}
@Controller('/api/incoming')
export class IncController extends IncomingController {
  constructor(private readonly quorumService: IncService) {
    super(quorumService);
  }
}
@Controller('/api/inventory')
export class InvController extends InventoryController {
  constructor(private readonly quorumService: InvService) {
    super(quorumService);
  }
}
@Controller('/api/masterdata')
export class MasController extends MasterController {
  constructor(private readonly quorumService: MasService) {
    super(quorumService);
  }
}
@Controller('/api/participant')
export class ParController extends ParticipantController {
  constructor(private readonly quorumService: ParService) {
    super(quorumService);
  }
}
@Controller('/api/recipient')
export class RecController extends RecipientController {
  constructor(private readonly quorumService: RecService) {
    super(quorumService);
  }
}
@Controller('/api/transaction')
export class TransController extends TransactionController {
  constructor(private readonly quorumService: TransService) {
    super(quorumService);
  }
}
@Controller('/api/user')
export class UsrController extends UserController {
  constructor(private readonly quorumService: UsrService) {
    super(quorumService);
  }
}
@Controller('/api/ledger')
export class BlckController extends BlockchainController {
  constructor(private readonly quorumService: BlckService) {
    super(quorumService);
  }
}
