export const CONSTANTS = {
  code: `{ parameter (or (or (pair %create_details (pair (pair (pair (string %category) (address %controller)) (pair (string %createdAt) (string %description))) (pair (pair (int %id) (string %manufacturedIn)) (pair (string %model) (string %name)))) (pair (address %owner) (string %profile))) (unit %get_details)) (or (pair %update_details (pair (pair (pair (int %id) (option %new_category string)) (pair (option %new_controller address) (option %new_createdAt string))) (pair (pair (option %new_description string) (option %new_manufacturedIn string)) (pair (option %new_model string) (option %new_name string)))) (option %new_profile string)) (pair %update_owner (pair (pair (int %id) (string %new_category)) (pair (string %new_createdAt) (string %new_description))) (pair (pair (string %new_manufacturedIn) (string %new_model)) (pair (string %new_name) (address %new_owner)))))) ; storage (pair (big_map %identities int (pair (pair (pair (pair (string %category) (address %controller)) (pair (string %createdAt) (string %description))) (pair (pair (string %manufacturedIn) (string %model)) (pair (string %name) (address %owner)))) (string %profile))) (int %next_id)) ; code { UNPAIR ; IF_LEFT { IF_LEFT { SWAP ; PUSH int 1 ; SWAP ; DUP ; DUG 2 ; CDR ; ADD ; SWAP ; DUP ; DUG 2 ; CAR ; DUP 4 ; CDR ; CDR ; DUP 5 ; CDR ; CAR ; DUP 6 ; CAR ; CDR ; CDR ; CDR ; PAIR ; DUP 6 ; CAR ; CDR ; CDR ; CAR ; DUP 7 ; CAR ; CDR ; CAR ; CDR ; PAIR ; PAIR ; DUP 6 ; CAR ; CAR ; CDR ; CDR ; DUP 7 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 7 ; CAR ; CAR ; CAR ; CDR ; DIG 7 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; CDR ; UPDATE ; PAIR } { DROP } } { IF_LEFT { SWAP ; PUSH mutez 0 ; AMOUNT ; COMPARE ; NEQ ; IF { PUSH string "Updating details doesn't cost anything." ; FAILWITH } {} ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; SWAP ; DUP ; DUG 2 ; CAR ; CAR ; CAR ; CDR ; SENDER ; COMPARE ; NEQ ; AND ; IF { PUSH string "You are not the owner or controller of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DIG 2 ; DUP 5 ; CDR ; IF_NONE { DUP 3 ; CDR } {} ; DUP 4 ; CAR ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DIG 7 ; CAR ; CAR ; CDR ; CAR ; IF_NONE { DUP 6 ; CAR ; CAR ; CAR ; CDR } {} ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } { DUP ; DUG 2 ; CAR ; CAR ; CAR ; SWAP ; DUP ; DUG 2 ; CAR ; DUP ; DUP 3 ; GET ; IF_NONE { PUSH string "This ID does not exist." ; FAILWITH } {} ; DUP ; CAR ; CDR ; CDR ; CDR ; SENDER ; COMPARE ; NEQ ; IF { PUSH string "You are not the owner of this ID." ; FAILWITH } {} ; DIG 3 ; CDR ; DUG 2 ; DUP ; DUG 3 ; CDR ; DIG 5 ; CDR ; CDR ; CDR ; DUP 5 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; DUP 6 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CDR ; DUP 6 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 6 ; CAR ; CAR ; CAR ; CDR ; DIG 6 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; PAIR } } ; NIL operation ; PAIR } }`,
  init: `(Pair { Elt 1 (Pair (Pair (Pair (Pair "newly" "tz1iNKwthoH3Wz1PBoSmWTtsAYc37CLyipTP") "02/25/2022" "this is for testing") (Pair "01/02/2021" "testing") "aman" "tz1iNKwthoH3Wz1PBoSmWTtsAYc37CLyipTP") "0x0501000000026869") } 2)`,
  wallet: {
    address: "tz1iNKwthoH3Wz1PBoSmWTtsAYc37CLyipTP",
    "pkh": "tz1iNKwthoH3Wz1PBoSmWTtsAYc37CLyipTP",
    "mnemonic": [
      "junior",
      "winner",
      "reform",
      "grant",
      "loyal",
      "exit",
      "dignity",
      "wrist",
      "tent",
      "toast",
      "noise",
      "banana",
      "swear",
      "farm",
      "empty"
    ],
    "email": "txtpxlxi.xbjcqcma@teztnets.xyz",
    "password": "zhYEEp1hja",
    "amount": "142016088676",
    "activation_code": "8489055287adf4104ba4e53333a18638842e8c37"
  },
  RPC_URL: "https://ghostnet.smartpy.io",
  VTraceApi: "https://vtracy.herokuapp.com/api",
};
// VTraceApi: "http://localhost:7000/api",
