import axios from "axios";
import { CONSTANTS } from "../constants";

export const updateContract = async (
  user_id: string,
  contract: string,
  address: string,
  Id: string,
  key: string,
) => {
  try {
    const response = await axios.put(CONSTANTS.VTraceApi + "/user/updateData", {
      user_id: user_id,
      contractAddress: contract,
      Wallet: CONSTANTS,
      Address: address,
      TezosAppID: Id,
    },{ headers: { "x-api-key": key } });
    console.log(response, "response of update contract");
    if(response.data.error){
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
