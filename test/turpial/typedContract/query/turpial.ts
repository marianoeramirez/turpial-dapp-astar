/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@supercolony/typechain-types';
import type { QueryReturnType } from '@supercolony/typechain-types';
import { queryJSON, queryOkJSON, handleReturnType } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/turpial';
import type * as ReturnTypes from '../types-returns/turpial';
import type BN from 'bn.js';
import {ReturnNumber} from '@supercolony/typechain-types';
import {getTypeDescription} from './../shared/utils';


export default class Methods {
	private __nativeContract : ContractPromise;
	private __callerAddress : string;

	constructor(
		nativeContract : ContractPromise,
		callerAddress : string,
	) {
		this.__nativeContract = nativeContract;
		this.__callerAddress = callerAddress;
	}

	/**
	* newAdvertisement
	*
	* @param { boolean } isBuy,
	* @param { (number | string | BN) } rate,
	* @returns { Result<ReturnNumber, ReturnTypes.Error> }
	*/
	"newAdvertisement" (
		isBuy: boolean,
		rate: (number | string | BN),
		__options ? : GasLimitAndRequiredValue,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "newAdvertisement", [isBuy, rate], __options , (result) => { return handleReturnType(result, getTypeDescription(11, 'turpial')); });
	}

	/**
	* lastToken
	*
	* @returns { ReturnNumber }
	*/
	"lastToken" (
		__options ? : GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__nativeContract, this.__callerAddress, "lastToken", [], __options , (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* getBalance
	*
	* @param { (string | number | BN) } id,
	* @returns { Result<ReturnNumber, ReturnTypes.Error> }
	*/
	"getBalance" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "getBalance", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(11, 'turpial')); });
	}

	/**
	* getRate
	*
	* @param { (string | number | BN) } id,
	* @returns { number }
	*/
	"getRate" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getRate", [id], __options );
	}

	/**
	* getIsBuy
	*
	* @param { (string | number | BN) } id,
	* @returns { boolean }
	*/
	"getIsBuy" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getIsBuy", [id], __options );
	}

	/**
	* getFinalized
	*
	* @param { (string | number | BN) } id,
	* @returns { boolean }
	*/
	"getFinalized" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getFinalized", [id], __options );
	}

	/**
	* startCommerce
	*
	* @param { (string | number | BN) } id,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"startCommerce" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "startCommerce", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'turpial')); });
	}

	/**
	* markAsPaid
	*
	* @param { (string | number | BN) } id,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"markAsPaid" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "markAsPaid", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'turpial')); });
	}

	/**
	* releaseMoney
	*
	* @param { (string | number | BN) } id,
	* @returns { Result<null, ReturnTypes.Error> }
	*/
	"releaseMoney" (
		id: (string | number | BN),
		__options ? : GasLimit,
	): Promise< QueryReturnType< Result<null, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "releaseMoney", [id], __options , (result) => { return handleReturnType(result, getTypeDescription(13, 'turpial')); });
	}

}