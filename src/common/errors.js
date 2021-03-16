// @flow
import type { Error } from '../business/type/response';

export const ERROR_INVALID_INPUT: Error = { status: 400, code: 1000, message: 'Input are invalid.' };
export const ERROR_ENDPOINT_NOT_FOUND: Error = { status: 400, code: 1001, message: 'This endpoint doesn\'t exist.' };
export const ERROR_ENDPOINT_NOT_IMPLEMENTED: Error = { status: 400, code: 1002, message: 'This endpoint is not implemented.' };

export const ERROR_ALIVE: Error = { status: 400, code: 2000, message: 'Check alive failed.' };
export const ERROR_ALIVE_MONGODB_NOT_ALIVE: Error = { status: 400, code: 2002, message: 'MongoDB is not alive.' };
