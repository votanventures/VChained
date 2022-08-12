import { diskStorage } from "multer";

export const CONSTANTS = {
  code: `{ parameter (or (or (pair %create_carbon (bytes %data) (string %id)) (pair %create_product (bytes %data) (string %id))) (or (pair %create_user (bytes %data) (string %id)) (unit %get_details))) ; storage (pair (pair (big_map %carbon string bytes) (big_map %products string bytes)) (big_map %users string bytes)) ; code { UNPAIR ; IF_LEFT { IF_LEFT { DUP 2 ; CDR ; DUP 3 ; CAR ; CDR ; DIG 3 ; CAR ; CAR ; DUP 4 ; CAR ; SOME ; DIG 4 ; CDR ; UPDATE } { DUP 2 ; CDR ; DUP 3 ; CAR ; CDR ; DUP 3 ; CAR ; SOME ; DIG 3 ; CDR ; UPDATE ; DIG 2 ; CAR ; CAR } ; PAIR ; PAIR } { IF_LEFT { DUP 2 ; CDR ; DUP 2 ; CAR ; SOME ; DIG 2 ; CDR ; UPDATE ; DUP 2 ; CAR ; CDR ; DIG 2 ; CAR ; CAR ; PAIR ; PAIR } { DROP } } ; NIL operation ; PAIR } }`,
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
  VTraceApi: "http://localhost:8000/api",
};
// VTraceApi: "http://localhost:7000/api",

export const storage = diskStorage({
  destination: __dirname+"/../../../../uploads",
  filename: (req, file, callback) => {
    callback(null, generateFilename(file));
  }
});

function generateFilename(file) {
  return `${file.originalname}`;
}
