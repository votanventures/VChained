import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import { InMemorySigner } from "@taquito/signer";
import { CONSTANTS } from "../constants";
import { buf2hex } from "@taquito/utils";
import { BlockchainError } from "../dto/BlockchainError";

export class BlockchainService {
  private tezos: TezosToolkit;
  rpcUrl: string;
  protected constructor(protected readonly logger: PinoLogger) {
    this.tezos = new TezosToolkit(CONSTANTS.RPC_URL);
    this.rpcUrl = CONSTANTS.RPC_URL;

    this.activateAccount();
    //declaring the parameters using fromFundraiser: mail, password, and passphrase from which one can extract the private key
    this.tezos.setSignerProvider(
      InMemorySigner.fromFundraiser(
        CONSTANTS.wallet.email,
        CONSTANTS.wallet.password,
        CONSTANTS.wallet.mnemonic.join(" ")
      )
    );
  }
  public async activateAccount() {
    try {
      const operation = await this.tezos.tz.activate(CONSTANTS.wallet.pkh, "");
      await operation.confirmation();
    } catch (e) {
      console.log(e);
    }
  }

  public async deploySample(key:string, user_id: string): Promise<{ data: any }> {
   
    try {
       // async function deploy() {
      const tezos = new TezosToolkit(CONSTANTS.RPC_URL);
      await importKey(
        tezos,
        CONSTANTS.wallet.email,
        CONSTANTS.wallet.password,
        CONSTANTS.wallet.mnemonic.join(" "),
        "57a58ba2e1cfa419ea4c4e7636b47e2ffd1e3527" //private key
      );

      const op = await tezos.contract.originate({
        code: CONSTANTS.code,
        init: CONSTANTS.init,
      });
      //beginning to deploy
      console.log("Awaiting confirmation...", op);
      const contract = await op.contract();
      //deployment report: amount of used gas, storage state
      console.log("Gas Used", op.consumedGas);
      console.log("Storage", await contract.storage());
      //operation hash one can use to find the contract in the explorer
      console.log("Operation hash:", op.hash);
      console.log("Contract here:", contract.address);
      // return {data:op.hash};
      const ct= await op.confirmation(1).then(async () => {
        // add a call to save in your database
        return { data: op.hash, contract: contract.address };
      });
      return ct;
    } catch (err) {
      console.log(err);
      return { data: { error: err} };
    }
  }
  public async createSample(body: any): Promise<{ data: any }> {
    try {
      const temp = {
        id: body.id,
        data: buf2hex(Buffer.from(JSON.stringify(body)))
      }
      const ctrct = await this.tezos.contract.at(body.contract)
      const op = await ctrct.methodsObject
        .create_product(temp)
        .send();
      return { data: await op.confirmation(1).then(() => op.hash) };
    } catch (e) {
      console.log(`Error in Test function: ${JSON.stringify(e, null, 2)}`);
      return { data: { error: e} };
    }
  }
  public async getDatabyKey(
    key: string,
    id: string,
    NID: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/get/${id}`,
        { headers: { "x-access-token": key, "netid": NID } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }
  public async getHistoryDatabyKey(
    key: string,
    id: string,
    NID: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/history/${id}`,
        { headers: { "x-access-token": key, "netid": NID } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }
  public async deploy(
    key:string,
    netid: string,
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.get(
        CONSTANTS.VTraceApi + `/ledger/deploy/${netid}`,
        { headers: { "x-access-token": key, "netid": netid } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred ${e}`, "Blockchain.error");
    }
  }
  public async write(
    key: string,
    body: any,
    netid: string
  ): Promise<{ data: any }> {
    try {
      const { data } = await axios.post(
        CONSTANTS.VTraceApi + "/ledger/create",body,
        { headers: { "x-access-token": key, "netid": netid } }
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw new BlockchainError(`Error occurred. ${e}`, "Blockchain.error");
    }
  }
}
