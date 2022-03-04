import {PinoLogger} from 'nestjs-pino';
import axios from 'axios';
import { BlockchainError } from '../dto/BlockchainError';
import { TezosToolkit } from '@taquito/taquito'
import { importKey } from '@taquito/signer';
import { InMemorySigner } from '@taquito/signer';
// import  { Tx } from '../services/Tx';
// const {CONSTANTS} = require('../constants');
import { CONSTANTS } from "../constants";

const provider = 'https://hangzhounet.smartpy.io/';
const RPC_URL = 'https://hangzhounet.smartpy.io/';


export class BlockchainService {
  private tezos: TezosToolkit
  rpcUrl: string
  protected constructor(protected readonly logger: PinoLogger) {
      this.tezos = new TezosToolkit(CONSTANTS.RPC_URL)
      this.rpcUrl = CONSTANTS.RPC_URL
      // new Tx(RPC_URL).activateAccount() 
      this.activateAccount()
    //declaring the parameters using fromFundraiser: mail, password, and passphrase from which one can extract the private key
    this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(CONSTANTS.email, CONSTANTS.password, CONSTANTS.mnemonic.join(' ')))

   }
   public async activateAccount() {
      try {
      const operation = await this.tezos.tz.activate(CONSTANTS.pkh,'')
      await operation.confirmation()
    } catch (e) {
      console.log(e)
    }
  }

//deploy function 
  public async deploy(): Promise<{ data:any }> {
  // async function deploy() {
    const tezos = new TezosToolkit(provider);
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
          //smart contract code
          // code: MS,
          code: `{ parameter (or (or (pair %create_details (pair (pair (pair (string %category) (address %controller)) (pair (string %createdAt) (string %description))) (pair (pair (int %id) (string %manufacturedIn)) (pair (string %model) (string %name)))) (pair (address %owner) (bytes %profile))) (unit %get_details)) (or (pair %update_details (pair (pair (pair (int %id) (option %new_category string)) (pair (option %new_controller address) (option %new_createdAt string))) (pair (pair (option %new_description string) (option %new_manufacturedIn string)) (pair (option %new_model string) (option %new_name string)))) (option %new_profile bytes)) (pair %update_owner (pair (pair (int %id) (string %new_category)) (pair (string %new_createdAt) (string %new_description))) (pair (pair (string %new_manufacturedIn) (string %new_model)) (pair (string %new_name) (address %new_owner)))))) ; storage (pair (big_map %identities int (pair (pair (pair (pair (string %category) (address %controller)) (pair (string %createdAt) (string %description))) (pair (pair (string %manufacturedIn) (string %model)) (pair (string %name) (address %owner)))) (bytes %profile))) (int %next_id)) ; code { UNPAIR ; IF_LEFT { IF_LEFT { SWAP ; PUSH int 1 ; SWAP ; DUP ; DUG 2 ; CDR ; ADD ; SWAP ; DUP ; DUG 2 ; CAR ; DUP 4 ; CDR ; CDR ; DUP 5 ; CDR ; CAR ; DUP 6 ; CAR ; CDR ; CDR ; CDR ; PAIR ; DUP 6 ; CAR ; CDR ; CDR ; CAR ; DUP 7 ; CAR ; CDR ; CAR ; CDR ; PAIR ; PAIR ; DUP 6 ; CAR ; CAR ; CDR ; CDR ; DUP 7 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 7 ; CAR ; CAR ; CAR ; CDR ; DIG 7 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; CDR ; UPDATE ; PAIR } { DROP } } { IF_LEFT { SWAP ; PUSH mutez 0 ; AMOUNT ; COMPARE ; NEQ ; IF { PUSH string "Updating details doesn't cost anything." ; FAILWITH } {} ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CDR ; SENDER ; COMPARE ; NEQ ; AND ; IF { PUSH string "You are not the owner or controller of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DIG 2 ; DUP 5 ; CDR ; IF_NONE { DUP 3 ; CDR } {} ; DUP 4 ; CAR ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DIG 7 ; CAR ; CAR ; CDR ; CAR ; IF_NONE { DUP 6 ; CAR ; CAR ; CAR ; CDR } {} ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } { DUP ; DUG 2 ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; IF { PUSH string "You are not the owner of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DUG 2 ; DUP ; DUG 3 ; CDR ; DIG 5 ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 6 ; CAR ; CAR ; CAR ; CDR ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } } ; NIL operation ; PAIR } }`,
          //storage state
          // init: INIT,
          init: `(Pair { Elt 1 (Pair (Pair (Pair (Pair "newly" "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM") "02/25/2022" "this is for testing") (Pair "01/02/2021" "testing") "aman" "tz1aRoaRhSpRYvFdyvgWLL6TGyRoGF51wDjM") 0x0501000000026869) } 2)`,
        })
    
        //beginning to deploy
        console.log('Awaiting confirmation...',op)
        const contract = await op.contract()
        //deployment report: amount of used gas, storage state
        console.log('Gas Used', op.consumedGas)
        console.log('Storage', await contract.storage())
        //operation hash one can use to find the contract in the explorer
        console.log('Operation hash:', op.hash)
        return {data:op.hash};
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
      contract:string}): Promise<{ data:any }>
    {
      try{
        console.log(body,"body here");
      const ctrct = await this.tezos.contract.at(body.contract)
      const op    = await ctrct.methods.create_details(
        body.name,
        body.controller, 
        body.profile,   
        body.model,
        body.id,
        body.category,
        body.description,          
        body.manufacturedIn,
        body.owner,
        body.createdAt
        ).send()
      return  {data : await op.confirmation(1).then(() => op.hash)}
    }catch(e){

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
    const ctrct = await this.tezos.contract.at(body.contract)
        //  id,
        //   owner,
        //   controller,
        //   manufacturedIn,
        //   name, 
        //   model,
        //   category,
        //   description,          
        //   createdAt,
        //   profile
    const op    = await ctrct.methods.update_details(
      body.id,
      body.owner,
      body.controller,
      body.manufacturedIn,
      body.name,
      body.model,
      body.category,
      body.description,
      body.createdAt, 
      body.profile           
      ).send()
    return  {data : await op.confirmation(1).then(() => op.hash)}
  }catch(e){
    return {data:e}
  }
  }
}

  