export const NODE_ACTION_CODES = [
  'on/off',
  'toggle',
  'delayed-reset',
  'phone-call',
];

export type NodeActionCode = typeof NODE_ACTION_CODES[number];
