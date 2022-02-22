import { TezosToolkit } from '@taquito/taquito';
import { importKey } from '@taquito/signer';

const provider = 'https://hangzhounet.smartpy.io/';

async function deploy() {
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
          code: `{ parameter (or (or (int %decrement) (unit %get)) (or (int %increment) (unit %reset))) ; storage int ; code { UNPAIR ; IF_LEFT { IF_LEFT { SWAP ; SUB } { DROP } } { IF_LEFT { ADD } { DROP 2 ; PUSH int 0 } } ; NIL operation ; PAIR } }`,
          //storage state
          init: `0`,
        })
    
        //beginning to deploy
        console.log('Awaiting confirmation...')
        const contract = await op.contract()
        //deployment report: amount of used gas, storage state
        console.log('Gas Used', op.consumedGas)
        console.log('Storage', await contract.storage())
        //operation hash one can use to find the contract in the explorer
        console.log('Operation hash:', op.hash)
      } catch (ex) {
        console.error(ex)
      }
    }

deploy();