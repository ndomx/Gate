import { DeviceAction, NodeActionCode } from './types';

export const SUPPORTED_ACTIONS_BY_CODE: Record<
  NodeActionCode,
  Array<DeviceAction>
> = {
  'on/off': ['off', 'on', 'toggle'],
  'phone-call': ['call'],
};
