import { Call } from "./call";

const RPC_URL = 'https://hangzhounet.smartpy.io/'

const CONTRACT = 'KT1FttqWMS2xcCQuyuwTGXbApAtJKeMTft96' //published contract address

const ADD = 5 //number to be received by the main function. You can change it
// const profile='0x0501000000026869'
// const c = 'tz1gjaF81ZRRvdzjobyfVNsAeSC6PScjfQwN';
// new Call(RPC_URL).add(profile, c,CONTRACT)
const id = 3
const profile='0x0501000000026869'
const owner = 'tz1KmAMKKFS9HzGZHvEqyJWhYF4pjqnSQ6av'
const controller = 'tz1KmAMKKFS9HzGZHvEqyJWhYF4pjqnSQ6av'
const name = 'aman newly'
const model = 'testing'
const category = 'newly'
const description = 'this is for testing'
const createdAt = 'abcd'
const manufacturedIn = 'defg'
new Call(RPC_URL).test(
    id,
    owner,
    controller,
    profile,
    name,
    model,
    category,
    description,
    createdAt,
    manufacturedIn,
    CONTRACT)

// new Call(RPC_URL).get(CONTRACT)