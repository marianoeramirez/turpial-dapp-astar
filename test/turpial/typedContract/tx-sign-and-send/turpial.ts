/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { KeyringPair } from '@polkadot/keyring/types';
import type { ApiPromise } from '@polkadot/api';
import type { GasLimit, GasLimitAndRequiredValue, Result } from '@supercolony/typechain-types';
import { txSignAndSend } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/turpial';
import type BN from 'bn.js';
// @ts-ignore
import type {EventRecord} from "@polkadot/api/submittable";
import {decodeEvents} from "../shared/utils";


export default class Methods {
	private __nativeContract : ContractPromise;
	private __keyringPair : KeyringPair;
	private __apiPromise: ApiPromise;

	constructor(
		apiPromise: ApiPromise,
		nativeContract : ContractPromise,
		keyringPair : KeyringPair,
	) {
		this.__apiPromise = apiPromise;
		this.__nativeContract = nativeContract;
		this.__keyringPair = keyringPair;
	}

	/**
	* newAdvertisement
	*
	* @param { boolean } isBuy,
	* @param { (number | string | BN) } rate,
	*/
	"newAdvertisement" (
		isBuy: boolean,
		rate: (number | string | BN),
		__options ? : GasLimitAndRequiredValue,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "newAdvertisement", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [isBuy, rate], __options);
	}

	/**
	* lastToken
	*
	*/
	"lastToken" (
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "lastToken", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [], __options);
	}

	/**
	* getBalance
	*
	* @param { (string | number | BN) } id,
	*/
	"getBalance" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getBalance", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* getRate
	*
	* @param { (string | number | BN) } id,
	*/
	"getRate" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getRate", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* getIsBuy
	*
	* @param { (string | number | BN) } id,
	*/
	"getIsBuy" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getIsBuy", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* getFinalized
	*
	* @param { (string | number | BN) } id,
	*/
	"getFinalized" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "getFinalized", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* startCommerce
	*
	* @param { (string | number | BN) } id,
	*/
	"startCommerce" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "startCommerce", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* markAsPaid
	*
	* @param { (string | number | BN) } id,
	*/
	"markAsPaid" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "markAsPaid", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

	/**
	* releaseMoney
	*
	* @param { (string | number | BN) } id,
	*/
	"releaseMoney" (
		id: (string | number | BN),
		__options ? : GasLimit,
	){
		return txSignAndSend( this.__apiPromise, this.__nativeContract, this.__keyringPair, "releaseMoney", (events: EventRecord) => {
			return decodeEvents(events, this.__nativeContract, "turpial");
		}, [id], __options);
	}

}