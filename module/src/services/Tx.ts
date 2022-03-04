import { TezosToolkit } from '@taquito/taquito'
//import inMemorySigner. It will save the private key in the memory and use it to sign transactions
import { InMemorySigner } from '@taquito/signer'
//declare the constant acc directing the script to acc.json
const acc = require('./acc.json')
export class Tx {
  private tezos: TezosToolkit
  rpcUrl: string
  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
    this.rpcUrl = rpcUrl

    //declare params with the method fromFundraiser: mail, password, and passphrase that allows one to get the private key
    this.tezos.setSignerProvider(InMemorySigner.fromFundraiser(acc.email, acc.password, acc.mnemonic.join(' ')))
  }
  //get the public and the private keys and activate the account
  public async activateAccount() {
    const { pkh, secret } = acc
    try {
      const operation = await this.tezos.tz.activate(pkh, secret)
      await operation.confirmation()
    } catch (e) {
      console.log(e)
    }
  }
  public async main() {}
}