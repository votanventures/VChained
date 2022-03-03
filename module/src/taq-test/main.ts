import { App } from './app'
// import Tx.ts
import { Tx } from './tx';

//declaring the constant with the node’s address
const RPC_URL = ' https://hangzhounet.smartpy.io/'

//launch App that will broadcast the node’s address to the main function
//declare the constant with the Everstake baker’s address
const ADDRESS = 'tz1KmAMKKFS9HzGZHvEqyJWhYF4pjqnSQ6av'

//launching App, sending a link to the node, calling getBalance and sending it the address
// new App(RPC_URL).getBalance(ADDRESS);

//call the function Tx, send it the testnet link, and ask to activate the account
new Tx(RPC_URL).activateAccount()
