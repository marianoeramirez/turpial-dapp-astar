export const proofSize = 131072;
export const refTime = 6219235328;

// maximum gas to be consumed for the call. if limit is too small the call will fail.
export const gasLimit = 3000n * 1000000n;
// a limit to how much Balance to be used to pay for the storage created by the contract call
// if null is passed, unlimited balance can be used
export const storageDepositLimit = null;

export const ALICE_ADDRESS = '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY';
export const CONTRACT_ADDRESS = "5Gef3bKb12gL4Ju8znJVSpbv1FaYvTvCNF7kViaivn2qUcVC";
export const URL_PROVIDER = 'ws://127.0.0.1:9944';

export default {proofSize, gasLimit, storageDepositLimit, refTime, ALICE_ADDRESS, CONTRACT_ADDRESS, URL_PROVIDER};