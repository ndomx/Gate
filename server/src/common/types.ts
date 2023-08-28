import { ACCESS_ROLES, ERROR_CODES } from './constants';

export type AccessRole = typeof ACCESS_ROLES[number];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
