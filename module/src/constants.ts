export const CONSTANTS = {
  code: `{ parameter (or (or (pair %create_product (pair (pair (pair (string %action) (string %category)) (string %createdIn) (string %description)) (pair (string %id) (string %manufactureIn)) (string %model) (string %name)) (pair (string %owner) (string %pid)) (string %user_id)) (unit %get_details)) (pair %update_product (pair (pair (pair (string %action) (string %category)) (string %claimRequest) (string %createdIn)) (pair (string %description) (string %id)) (string %manufactureIn) (string %model)) (pair (pair (string %name) (string %owner)) (string %parentID) (list %partComposition string)) (pair (string %pid) (list %subParts string)) (string %user_id))) ; storage (pair (pair (big_map %list string (pair (string %percentageUsed) (string %productID))) (big_map %products string (pair (pair (pair (pair (string %action) (string %category)) (string %claimRequest) (string %createdIn)) (pair (string %description) (string %id)) (string %manufactureIn) (string %model)) (pair (pair (string %name) (string %owner)) (string %parentID) (list %partComposition string)) (pair (string %pid) (list %subParts string)) (string %user_id)))) (big_map %users string (pair (pair (address %address) (string %pid)) (string %uid)))) ; code { UNPAIR ; IF_LEFT { IF_LEFT { NIL string ; DUP 3 ; CDR ; DUP 4 ; CAR ; CDR ; DUP 4 ; CDR ; CDR ; DUP 4 ; DUP 6 ; CDR ; CAR ; CDR ; PAIR ; PAIR ; DIG 3 ; PUSH string "" ; PAIR ; DUP 5 ; CDR ; CAR ; CAR ; DUP 6 ; CAR ; CDR ; CDR ; CDR ; PAIR ; PAIR ; PAIR ; DUP 4 ; CAR ; CDR ; CDR ; CAR ; DUP 5 ; CAR ; CDR ; CAR ; CDR ; PAIR ; DUP 5 ; CAR ; CDR ; CAR ; CAR ; DUP 6 ; CAR ; CAR ; CDR ; CDR ; PAIR ; PAIR ; DUP 5 ; CAR ; CAR ; CDR ; CAR ; PUSH string "" ; PAIR ; DUP 6 ; CAR ; CAR ; CAR ; CDR ; PUSH string "Created object successfully" ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; CAR ; CDR ; CAR ; CAR ; UPDATE ; DIG 2 ; CAR ; CAR ; PAIR ; PAIR } { DROP } } { DUP ; CAR ; CDR ; CAR ; CDR ; DUP 3 ; CDR ; DUP 4 ; CAR ; CDR ; DUP 4 ; CDR ; CDR ; CDR ; DUP 5 ; CDR ; CDR ; CAR ; CDR ; DUP 6 ; CDR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 5 ; CDR ; CAR ; CDR ; CDR ; DUP 6 ; CDR ; CAR ; CDR ; CAR ; PAIR ; DUP 6 ; CDR ; CAR ; CAR ; CDR ; DUP 7 ; CDR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; DUP 5 ; CAR ; CDR ; CDR ; CDR ; DUP 6 ; CAR ; CDR ; CDR ; CAR ; PAIR ; DUP 5 ; DUP 7 ; CAR ; CDR ; CAR ; CAR ; PAIR ; PAIR ; DUP 6 ; CAR ; CAR ; CDR ; CDR ; DUP 7 ; CAR ; CAR ; CDR ; CAR ; PAIR ; DUP 7 ; CAR ; CAR ; CAR ; CDR ; DIG 7 ; CAR ; CAR ; CAR ; CAR ; PAIR ; PAIR ; PAIR ; PAIR ; SOME ; DIG 3 ; UPDATE ; DIG 2 ; CAR ; CAR ; PAIR ; PAIR } ; NIL operation ; PAIR } }`,
  init: `(Pair (Pair {} {}) {})`,
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
