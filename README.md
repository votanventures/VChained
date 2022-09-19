# [VChained API Client](https://vchained.com/)

VChained API client allows browsers and Node.js clients to interact with VChained APIs. 

It includes the following components for Supply Chain Management.

- **Network Management** - Create/Manage your network
- **Participant Management** - Add remove Participants to the network
- **Inventory Management** - All Participants can manage inventories at single place, transfer from one to another
- **Product Management** - Assign Sub-Parts to Product, club raw materials to create a new part and much more
- **Blockchain APIs** - Write/Read all your data on Blockchain with our APIs
- **Offchain Database Storage** - Store data on offchain database for quicker insights and analytics

You can find API documentation at [Github Pages](http://vtracy.herokuapp.com/docs).

## Status

Project is currently at [`Beta`](https://github.com/Votan-Ventures/VChained) version. We are open to suggestions and feedbacks

## Installation

### Node.js

1. Install module:

   `npm install`

### Node.JS & Browser support

Library is written in TypeScript with ES2017 as the target JS version. Library should work in Node.JS current LTS.


## Configuration and setup
### VChained API KEY

Currently we support upto 3000 credits per network, that means you can make upto 3000 transactions per month. Just start by requesting access to the apis and connect to our VChained Dashboard for FREE.

### Testnet type

Build with Tezos, we are live on ghostnet. You will be able to deploy your own smart contract on ghostnet and experiment with our set of functions

### Retry Delay
Right now the Backend is hosted on Heroku with default timeouts of 30secs per request, sometimes during bulk updates you will get a timeout but the api will always hit and perform it's task, we are currently working to resolve this.

## Directory structure

```bash
└── api
│   ├── src
│   │   ├── app.controller.ts
│   │   ├── app.module.ts
│   │   ├── app.service.ts
│   │   └── main.ts // this will start the server
└── smart-contract  // smart contracts samples JSLigo
└── module
│   ├── src
│   │   ├── controllers // api endpoints per module
│   │   ├── dto         // dtos to be added per transactions 
│   │   ├── services    // services per module   
│   │   └── constants.ts        // Constants
├── README.md
└── .gitignore
```

## Contributing

Contributions to the VChained client are welcome. Please ensure
that you have tested the changes with a local client and have added unit test
coverage for your code.