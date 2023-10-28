import { ACCESS_ROLES, COMMAND_RESPONSE_CODES, ERROR_CODES } from './constants';

export type AccessRole = typeof ACCESS_ROLES[number];
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
export type CommandResponseCode =
  typeof COMMAND_RESPONSE_CODES[keyof typeof COMMAND_RESPONSE_CODES];
