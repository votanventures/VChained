# VChained Upgrade to new Tezos testnet

Steps to upgrade tezos-client

install tezos-client
brew tap serokell/tezos-packaging-stable https://github.com/serokell/tezos-packaging-stable.git

brew install tezos-client         

update url to new testnet

tezos-client --endpoint config update


create a new faucet file by downloading json from
https://teztnets.xyz/


copy paste the file to temp.json and run the command below

tezos-client activate account faucet with ./temp.json

go to module/src/contants.ts and save the new values from temp.json here
