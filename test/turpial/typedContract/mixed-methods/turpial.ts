/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { ApiPromise } from '@polkadot/api';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@supercolony/typechain-types';
import type { QueryReturnType } from '@supercolony/typechain-types';
import { queryOkJSON, queryJSON, handleReturnType } from '@supercolony/typechain-types';
import { txSignAndSend } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/turpial';
import type * as ReturnTypes from '../types-returns/turpial';
import type BN from 'bn.js';
import {ReturnNumber} from '@supercolony/typechain-types';
import {getTypeDescription} from './../shared/utils';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __callerAddress : string;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise : ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
		this.__callerAddress = keyringPair.address;
	}

	/**
	* newAdvertisement
	*
	* @param { boolean } isBuy,
	* @param { (number | string | BN) } rate,
	* @returns { void }
	*/
	"newAdvertisement" (
		isBuy: boolean,
		rate: (number | string | BN),
		__options: GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newAdvertisement", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [isBuy, rate], __options);
	}

	/**
	* lastToken
	*
	* @returns { ReturnNumber }
	*/
	"lastToken" (
		__options: GasLimit,
	): Promise< QueryReturnType< ReturnNumber > >{
		return queryJSON< ReturnNumber >( this.__nativeContract, this.__callerAddress, "lastToken", [], __options, (result) => { return new ReturnNumber(result as (number | string)); });
	}

	/**
	* getBalance
	*
	* @param { (string | number | BN) } id,
	* @returns { Result<ReturnNumber, ReturnTypes.Error> }
	*/
	"getBalance" (
		id: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< Result<ReturnNumber, ReturnTypes.Error> > >{
		return queryOkJSON( this.__nativeContract, this.__callerAddress, "getBalance", [id], __options, (result) => { return handleReturnType(result, getTypeDescription(11, 'turpial')); });
	}

	/**
	* getRate
	*
	* @param { (string | number | BN) } id,
	* @returns { number }
	*/
	"getRate" (
		id: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< number > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getRate", [id], __options);
	}

	/**
	* getIsBuy
	*
	* @param { (string | number | BN) } id,
	* @returns { boolean }
	*/
	"getIsBuy" (
		id: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getIsBuy", [id], __options);
	}

	/**
	* getFinalized
	*
	* @param { (string | number | BN) } id,
	* @returns { boolean }
	*/
	"getFinalized" (
		id: (string | number | BN),
		__options: GasLimit,
	): Promise< QueryReturnType< boolean > >{
		return queryJSON( this.__nativeContract, this.__callerAddress, "getFinalized", [id], __options);
	}

	/**
	* startCommerce
	*
	* @param { (string | number | BN) } id,
	* @returns { void }
	*/
	"startCommerce" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "startCommerce", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* markAsPaid
	*
	* @param { (string | number | BN) } id,
	* @returns { void }
	*/
	"markAsPaid" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "markAsPaid", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* releaseMoney
	*
	* @param { (string | number | BN) } id,
	* @returns { void }
	*/
	"releaseMoney" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "releaseMoney", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

}