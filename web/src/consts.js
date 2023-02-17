export const proofSize = 131072;
export const refTime = 6219235328;

// maximum gas to be consumed for the call. if limit is too small the call will fail.
export const gasLimit = 3000n * 1000000n;
// a limit to how much Balance to be used to pay for the storage created by the contract call
// if null is passed, unlimited balance can be used
export const storageDepositLimit = null;

export const CONTRACT_ADDRESS = "WjYpkEArG1DQMbTKbyvfHL8N7SJuEk756fP7TowVLw5YJjb";
export const URL_PROVIDER = 'wss://rpc.shibuya.astar.network/';

export default {proofSize, gasLimit, storageDepositLimit, refTime, CONTRACT_ADDRESS, URL_PROVIDER};