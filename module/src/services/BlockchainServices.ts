import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { TezosToolkit } from '@taquito/taquito'
import { importKey } from '@taquito/signer';
import { InMemorySigner } from '@taquito/signer';
import { CONSTANTS } from "../constants";
// Contract file
import { updateContract } from "./Common";

export class BlockchainService {
  private tezos: TezosToolkit
  rpcUrl: string
  protected constructor(protected readonly logger: PinoLogger) {
      this.tezos = new TezosToolkit(CONSTANTS.RPC_URL)
      this.rpcUrl = CONSTANTS.RPC_URL
      // new Tx(RPC_URL).activateAccount() 
      this.activateAccount()
    //declaring the parameters using fromFundraiser: mail, password, and passphrase from which one can extract the private key
    this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(CONSTANTS.wallet.email, CONSTANTS.wallet.password, CONSTANTS.wallet.mnemonic.join(' ')))
   }
   public async activateAccount() {
      try {
      const operation = await this.tezos.tz.activate(CONSTANTS.wallet.pkh,'')
      await operation.confirmation()
    } catch (e) {
      console.log(e)
    }
  }

//deploy function 
  public async deploy(): Promise<{ data:any }> {
  // async function deploy() {
    const tezos = new TezosToolkit(CONSTANTS.RPC_URL);
    await importKey(
      tezos,
      "qcpqedqq.bgoxbsct@teztnets.xyz", //mail
      "oCuMptn7sq", //password
      [           
        "jacket",  //passphrase
		"fire",
		"sample",
		"filter",
		"there",
		"ship",
		"pistol",
		"swarm",
		"infant",
		"sand",
		"degree",
		"replace",
		"soup",
		"gossip",
		"hood"
      ].join(' '),
      "57a58ba2e1cfa419ea4c4e7636b47e2ffd1e3527"  //private key
    );
    
    try {
        const op = await tezos.contract.originate({
          code: CONSTANTS.code,
          init: CONSTANTS.init
          })
        //beginning to deploy
        console.log('Awaiting confirmation...',op)
        const contract = await op.contract()
        //deployment report: amount of used gas, storage state
        console.log('Gas Used', op.consumedGas)
        console.log('Storage', await contract.storage())
        //operation hash one can use to find the contract in the explorer
        console.log('Operation hash:', op.hash)
        console.log('Contract here:', contract.address)
        // return {data:op.hash};
        return await op.confirmation(1).then(async() => {
          const UpdateContract = await updateContract(contract.address,CONSTANTS.wallet.address,'1')
          console.log(UpdateContract)
          if(!UpdateContract){
            return {data:"Error While Saving The Details To Database", contract:contract.address}
          }
          return {data:op.hash, contract:contract.address};
        })
      } catch (ex) {
        console.error(ex)
        return {data:ex}
      }
    }
    // create details function starting here
    public async create(
      body:{
      id: number, 
      owner: string, 
      controller: string, 
      profile: string, 
      name:string,
      model:string,
      category:string, 
      description:string,
      createdAt:string,
      manufacturedIn:string,
      contract?:string}): Promise<{ data:any }>
    {
      try{
      console.log(body,"body here");
      if(!body.contract){
        body.contract= await axios.get(CONSTANTS.VTraceApi+'/user/id?user_id')
      }
      if(!body.contract){
        return {data:"Please Specify Contract Address"}
      }
      const ctrct = await this.tezos.contract.at("KT1S2h1cbttAwWZrT9HiiMMqKt1BHvvER4bp")
      const op    = await ctrct.methodsObject.create_details(
        {
          category: body.category,
          controller: body.controller,
          createdAt: body.createdAt,
          description: body.description ,
          id: body.id ,
          manufacturedIn: body.manufacturedIn ,
          model: body.model,
          name: body.name,
          owner: body.owner,
          profile: body.profile
        }
        ).send()
      return  {data : await op.confirmation(1).then(() => op.hash)}
      } catch(e){
      console.log(`Error in Test function: ${JSON.stringify(e, null, 2)}`)
      return {data:e}
    }
  }
  //  update function starting here
  public async update(
    body:{
    id: number, 
    owner: string, 
    controller: string, 
    profile: string, 
    name:string,
    model:string,
    category:string, 
    description:string,
    createdAt:string,
    manufacturedIn:string,
    contract:string}): Promise<{ data:any }>
  {
    try{
    const ctrct = await this.tezos.contract.at("KT1S2h1cbttAwWZrT9HiiMMqKt1BHvvER4bp")
    const op    = await ctrct.methodsObject.update_details(
      {
        new_category: body.category,
        new_controller: body.controller,
        new_createdAt: body.createdAt,
        new_description: body.description,
        id: body.id,
        new_manufacturedIn: body.manufacturedIn,
        new_model: body.model,
        new_name: body.name,
        new_owner: body.owner,
        new_profile: body.profile
      }        
      ).send()
    return  {data : await op.confirmation(1).then(() => op.hash)}
  } catch(e){
    return {data:e}
  }
  }
}

  