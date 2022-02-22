import { TezosToolkit } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
const acc = require('./acc.json')
export class Call {
  private tezos: TezosToolkit
  rpcUrl: string

  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
    this.rpcUrl = rpcUrl

    //declaring the parameters using fromFundraiser: mail, password, and passphrase from which one can extract the private key
    this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(acc.email, acc.password, acc.mnemonic.join(' ')))
  }

  public add(add: number, contract: string) {
    this.tezos.contract
      .at(contract) //call the contract to get its entry points
      .then((contract) => {
        console.log(`Adding ${add} to storage...`)
        //calling the main function. Unlike ligo syntax, the main entry point is referred to as default
        return contract.methods.default(add).send()
      })
      .then((op) => {
        console.log(`Awaiting for ${op.hash} to be confirmed...`)
        return op.confirmation(1).then(() => op.hash) //waiting for 1 confirmation to get the results faster
      })
      .then((hash) => console.log(`Call done}`)) //call is successful
      .catch((error) => console.log(`Error: ${JSON.stringify(error, null, 2)}`))
  }
  public get(contract: string) {
    this.tezos.contract
      .at(contract) 
      .then((contract) => {
        return contract.methods.get();
      })
      .then((op) => {
        console.log(`Awaiting for ${op} to be confirmed...`)
        // return op.confirmation(1).then(() => op.hash)  
      })
  }
}