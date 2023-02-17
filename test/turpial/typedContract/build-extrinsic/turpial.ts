/* This file is auto-generated */

import type { ContractPromise } from '@polkadot/api-contract';
import type { GasLimit, GasLimitAndRequiredValue } from '@supercolony/typechain-types';
import { buildSubmittableExtrinsic } from '@supercolony/typechain-types';
import type * as ArgumentTypes from '../types-arguments/turpial';
import type BN from 'bn.js';



export default class Methods {
	private __nativeContract : ContractPromise;

	constructor(
		nativeContract : ContractPromise,
	) {
		this.__nativeContract = nativeContract;
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
		__options: GasLimitAndRequiredValue,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "newAdvertisement", [isBuy, rate], __options);
	}

	/**
	 * lastToken
	 *
	*/
	"lastToken" (
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "lastToken", [], __options);
	}

	/**
	 * getBalance
	 *
	 * @param { (string | number | BN) } id,
	*/
	"getBalance" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getBalance", [id], __options);
	}

	/**
	 * getRate
	 *
	 * @param { (string | number | BN) } id,
	*/
	"getRate" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getRate", [id], __options);
	}

	/**
	 * getIsBuy
	 *
	 * @param { (string | number | BN) } id,
	*/
	"getIsBuy" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getIsBuy", [id], __options);
	}

	/**
	 * getFinalized
	 *
	 * @param { (string | number | BN) } id,
	*/
	"getFinalized" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "getFinalized", [id], __options);
	}

	/**
	 * startCommerce
	 *
	 * @param { (string | number | BN) } id,
	*/
	"startCommerce" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "startCommerce", [id], __options);
	}

	/**
	 * markAsPaid
	 *
	 * @param { (string | number | BN) } id,
	*/
	"markAsPaid" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "markAsPaid", [id], __options);
	}

	/**
	 * releaseMoney
	 *
	 * @param { (string | number | BN) } id,
	*/
	"releaseMoney" (
		id: (string | number | BN),
		__options: GasLimit,
	){
		return buildSubmittableExtrinsic( this.__nativeContract, "releaseMoney", [id], __options);
	}

}