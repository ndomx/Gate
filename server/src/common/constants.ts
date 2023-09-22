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
