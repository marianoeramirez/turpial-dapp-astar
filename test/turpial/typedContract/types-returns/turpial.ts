import type BN from 'bn.js';
import type {ReturnNumber} from '@supercolony/typechain-types';

export type AccountId = string | number[]

export enum TypeOperation {
	buy = 'Buy',
	sell = 'Sell'
}

export type Key = string | number[]

export enum Error {
	notOwner = 'NotOwner',
	notValid = 'NotValid',
	tokenNotFound = 'TokenNotFound',
	notAllowed = 'NotAllowed',
	callerIsNotOwner = 'CallerIsNotOwner',
	callerIsNotContrapart = 'CallerIsNotContrapart'
}

