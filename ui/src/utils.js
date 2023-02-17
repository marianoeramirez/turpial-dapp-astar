import { Abi, ContractPromise } from '@polkadot/api-contract';
import abiData from "./crypto/abi";
import * as consts from './consts';


export function get_contract(api){
    const abi = new Abi(abiData, api.registry.getChainProperties())
    return new ContractPromise(api, abi, consts.CONTRACT_ADDRESS);
  }
  