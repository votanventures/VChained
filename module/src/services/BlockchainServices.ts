import { PinoLogger } from "nestjs-pino";
import axios from "axios";
import { TezosToolkit } from "@taquito/taquito";
import { importKey } from "@taquito/signer";
import { InMemorySigner } from "@taquito/signer";
import { CONSTANTS } from "../constants";
// Contract file
import { updateContract } from "./Common";
import { Tx } from "./Tx";

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

  //deploy function
  public async deploy(key:string, user_id: string): Promise<{ data: any }> {
    // async function deploy() {
    const tezos = new TezosToolkit(CONSTANTS.RPC_URL);
    await importKey(
      tezos,
      CONSTANTS.wallet.email,
      CONSTANTS.wallet.password,
      CONSTANTS.wallet.mnemonic.join(" "),
      "57a58ba2e1cfa419ea4c4e7636b47e2ffd1e3527" //private key
    );

    try {
      console.log('i am here', user_id)
      const op = await tezos.contract.originate({
        code: CONSTANTS.code,
        init: CONSTANTS.init,
      });
      console.log('i am here2')
      //beginning to deploy
      console.log("Awaiting confirmation...", op);
      console.log('i am here3')
      const contract = await op.contract();
      //deployment report: amount of used gas, storage state
      console.log('i am here4')
      console.log("Gas Used", op.consumedGas);
      console.log("Storage", await contract.storage());
      //operation hash one can use to find the contract in the explorer
      console.log("Operation hash:", op.hash);
      console.log("Contract here:", contract.address);
      // return {data:op.hash};
      const x= await op.confirmation(1).then(async () => {
        const UpdateContract = await updateContract(
          user_id,
          contract.address,
          CONSTANTS.wallet.address,
          "1",
          key
        );
        console.log(UpdateContract);
        if (!UpdateContract) {
          return {
            data: "Error While Saving The Details To Database",
            contract: contract.address,
          };
        }
        return { data: op.hash, contract: contract.address };
      });
      console.log('this is x',x)
      return x;
    } catch (ex) {
      console.error(ex);
      return { data: ex };
    }
  }
  // create details function starting here
  public async create(body: {
    id: string,
    name: string,
    user_id: string,
    PID: string,
    owner: string,
    category: string,
    model: string,
    manufactureIn: string,
    createdIn: string,
    description: string,
    action: string,
    contract?: string;
  }): Promise<{ data: any }> {
    try {
      console.log(body, "body here");
      if (!body.contract) {
        body.contract = await axios.get(
          CONSTANTS.VTraceApi + "/user/id?user_id"
        );
      }
      if (!body.contract) {
        return { data: "Please Specify Contract Address" };
      }
      const ctrct = await this.tezos.contract.at(body.contract);
      const contract = await axios.get(CONSTANTS.VTraceApi + "/user/getUser");
      if (!body.contract) {
        return contract;
      }
      const op = await ctrct.methodsObject
        .create_product({
          id: body.id,
          name: body.name,
          user_id: body.user_id,
          pid: body.PID,
          owner: body.owner,
          category: body.category,
          model: body.model,
          manufactureIn: body.manufactureIn,
          createdIn: body.createdIn,
          description: body.description,
          action: body.action
        })
        .send();
      return { data: await op.confirmation(1).then(() => op.hash) };
    } catch (e) {
      console.log(`Error in Test function: ${JSON.stringify(e, null, 2)}`);
      return { data: e };
    }
  }
  //  update function starting here
  public async update(body: {
    id: string,
    name: string,
    user_id: string,
    PID: string,
    owner: string,
    claimRequest: string,
    category: string,
    model: string,
    manufactureIn: string,
    createdIn: string,
    description: string,
    action: string,
    contract: string,
    parentIDs: Array<string>,
    percentageUsed: Array<string>,
    subParts: Array<string>
  }): Promise<{ data: any }> {
    try {
      const ctrct = await this.tezos.contract.at(body.contract);
      const contract = await axios.get(CONSTANTS.VTraceApi + "/user/getUser");
      if (!body.contract) {
        return contract;
      }
      const op = await ctrct.methodsObject
        .update_product({
          id: body.id,
          name: body.name,
          user_id: body.user_id,
          pid: body.PID,
          owner: body.owner,
          claimRequest: body.claimRequest,
          category: body.category,
          model: body.model,
          manufactureIn: body.manufactureIn,
          createdIn: body.createdIn,
          description: body.description,
          action: body.action,
          parentIDs: body.parentIDs,
          percentageUsed: body.percentageUsed,
          subParts: body.subParts
        })
        .send();
      return { data: await op.confirmation(1).then(() => op.hash) };
    } catch (e) {
      return { data: e };
    }
  }
  //  modify user
  public async updateUser(body: {
    address: string,
    UID: string,
    PID: string,
    contract: string
  }): Promise<{ data: any }> {
    try {
      const ctrct = await this.tezos.contract.at(body.contract);
      const contract = await axios.get(CONSTANTS.VTraceApi + "/user/getUser");
      if (!body.contract) {
        return contract;
      }
      const op = await ctrct.methodsObject
        .create_user({
          address: body.address,
          uid: body.UID,
          pid: body.PID
        })
        .send();
      return { data: await op.confirmation(1).then(() => op.hash) };
    } catch (e) {
      return { data: e };
    }
  }
}
