import { TezosToolkit } from '@taquito/taquito'
export class App {
     //declaring private tezos modifier of TezosToolkit type
  private tezos: TezosToolkit

  //declaring the constructor rpcUrl that will broadcast the Tezos public node address to TezosToolkit
  constructor(rpcUrl: string) {
    this.tezos = new TezosToolkit(rpcUrl)
  }
     //declaring the method getBalance with input param address
  public getBalance(address: string): void {
    //Taquito sends a request for balance to the node. If the node executed the request, the script displays the value in the console, otherwise it says “Address not found”
    this.tezos.rpc
      .getBalance(address)
      .then((balance) => console.log(balance))
      .catch((e) => console.log('Address not found'))
  }
  public async main() {}
}