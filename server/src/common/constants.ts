export const ACCESS_ROLES = ['admin', 'user', 'all'] as const;

export const ERROR_CODES = {
  USER_NOT_FOUND: 'user not found',
  ACCESS_DENIED: 'access denied',
  DEVICE_NOT_FOUND: 'device not found',
  DATABASE_ERROR: 'database error',
  ROOT_NOT_FOUND: 'root not found',
  NOT_DEVICE: 'not a device',
  NOT_ADMIN: 'not an admin',
  PATH_ERROR: 'path error',
  GATE_ERROR: 'gate error',
  NODE_NOT_FOUND: 'node not found',
  INVALID_REQUEST: 'invalid request',
} as const;

export const COMMAND_RESPONSE_CODES = {
  OK: 0,
  TIMEOUT: 1,
  INVALID_PAYLOAD: 2,
  INVALID_COMMAND: 3,
  INVALID_ACTION: 4,
  UNKNOWN_ERROR: 5,
} as const;
