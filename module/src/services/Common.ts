import axios from 'axios';
import { CONSTANTS } from '../constants';

export const updateContract = async (contract:string,address:string,Id:string) => {
    try {
        const response = await axios.put(CONSTANTS.VTraceApi+'/user/update',{
            contractAddress:contract,
            Wallet: CONSTANTS,
            Address:address,
            TezosAppID:Id
        })
        console.log(response,"response of update contract")
        return true;
    } catch (err) {
        return false;
    }
};

