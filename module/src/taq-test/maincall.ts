import { Call } from "./call";

const RPC_URL = 'https://hangzhounet.smartpy.io/'

const CONTRACT = 'KT1EHcsAT6hoW1uUi4w8Teyo5vLTRq2t9YGw' //published contract address

const ADD = 5 //number to be received by the main function. You can change it

// new Call(RPC_URL).add(ADD, CONTRACT)
new Call(RPC_URL).get(CONTRACT)