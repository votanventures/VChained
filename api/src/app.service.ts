import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { NetworkService } from '../../module/src/services/NetworkService';
import { IncomingService } from '../../module/src/services/IncomingService';
import { InventoryService } from '../../module/src/services/InventoryService';
import { MasterService } from '../../module/src/services/MasterService';
import { ParticipantService } from '../../module/src/services/ParticipantService';
import { RecipientService } from '../../module/src/services/RecipientService';
import { TransactionService } from '../../module/src/services/TransactionService';
import { UserService } from '../../module/src/services/UserService';
import { BlockchainService } from '../../module/src/services/BlockchainServices';

@Injectable()
export class NetService extends NetworkService {
  constructor(@InjectPinoLogger(NetService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class IncService extends IncomingService {
  constructor(@InjectPinoLogger(IncService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class InvService extends InventoryService {
  constructor(@InjectPinoLogger(InvService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class MasService extends MasterService {
  constructor(@InjectPinoLogger(MasService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class ParService extends ParticipantService {
  constructor(@InjectPinoLogger(ParService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class RecService extends RecipientService {
  constructor(@InjectPinoLogger(RecService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class TransService extends TransactionService {
  constructor(@InjectPinoLogger(TransService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class UsrService extends UserService {
  constructor(@InjectPinoLogger(UsrService.name) logger: PinoLogger) {
    super(logger);
  }
}
@Injectable()
export class BlckService extends BlockchainService {
  constructor(@InjectPinoLogger(BlckService.name) logger: PinoLogger) {
    super(logger);
  }
}
