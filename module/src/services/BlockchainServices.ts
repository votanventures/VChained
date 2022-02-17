import {
  WalletClient,
  BeaconMessageType,
  PermissionScope,
  PermissionResponseInput,
  BeaconErrorType,
  BeaconResponseInputMessage
} from "@airgap/beacon-sdk";

const connectApp = async (): Promise<void> => {
  // Only ONE WalletClient should be created and reused everywhere.
  const client = new WalletClient({ name: "My Wallet" });
  await client.init(); // Establish P2P connection

  client
    .connect(async (message) => {
      console.log("beacon message", message);

      let response: BeaconResponseInputMessage;
      switch (message.type) {
        case BeaconMessageType.PermissionRequest:
          // Prompt user for permissions. If multiple accounts are available, let user choose one of them

          response = {
            type: BeaconMessageType.PermissionResponse,
            network: message.network, // Use the same network that the user requested
            scopes: message.scopes,
            id: message.id,
            publicKey:
              "3b92229274683b311cf8b040cf91ac0f8e19e410f06eda5537ef077e718e0024",
          };

          // Optional
          // If the user aborts an action at any time, you can send back an error:
          response = {
            type: BeaconMessageType.Error,
            id: message.id,
            errorType: BeaconErrorType.ABORTED_ERROR,
          };

          break;
        case BeaconMessageType.SignPayloadRequest:
          // Sign message.payload and return signature

          response = {
            type: BeaconMessageType.SignPayloadResponse,
            id: message.id,
            signingType: message.signingType,
            signature: "edsig...",
          };

          break;
        case BeaconMessageType.OperationRequest:
          // Prepare transaction based on the details give in message.operationDetails
          // message.operationDetails only contains a partial tezos transaction. Not all fields are mandatory
          // The fields that are not present (eg. counter, fee, gas_limit) have to be set by the wallet
          // If one of the optional fields is set, then that one should be used and not replaced by the wallet

          response = {
            type: BeaconMessageType.OperationResponse,
            id: message.id,
            transactionHash: "op...",
          };

          // Optional
          // If the transaction cannot be prepared, (eg. run_operations fails), an error containing the rpc error can be returned
          let error = [
            {
              kind: "temporary",
              id: "proto.008-PtEdo2Zk.contract.balance_too_low",
              contract: "tz1...",
              balance: "100",
              amount: "200",
            },
          ]; // RPC error
          response = {
            type: BeaconMessageType.Error,
            id: message.id,
            errorType: BeaconErrorType.TRANSACTION_INVALID_ERROR,
            errorData: error,
          };

          break;
        case BeaconMessageType.BroadcastRequest:
          response = {
            type: BeaconMessageType.OperationResponse,
            id: message.id,
            transactionHash: "op...",
          };

          break;
        default:
          response = {
            type: BeaconMessageType.Error,
            id: (message as any).id, // Typescript assumes message is of type "never", but we should still add this to handle any potential future messages we don't support yet.
            errorType: BeaconErrorType.ABORTED_ERROR,
          };
      }

      client.respond(response);
    })
    .catch((error) => console.error("connect error", error));
};

connectApp().catch((error) => console.error("connect error", error));

