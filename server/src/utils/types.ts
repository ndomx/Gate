import { DEVICE_ACTIONS, NODE_ACTION_CODES } from './constants';

export type NodeActionCode = typeof NODE_ACTION_CODES[number];
export type DeviceAction = typeof DEVICE_ACTIONS[number];
