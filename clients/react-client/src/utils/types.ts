export type GateUser = {
  id: string;
  name: string;
  last: string;
  username: string;
  access: string[];
  authId: string;
};

export type GateNode = {
  id: string;
  name: string;
  displayName: string;
  actionCode: string;
  deviceId: string;
};

export type UserWithNodes = {
  user: GateUser;
  nodes: GateNode[];
};

export type CommandStatus = {
  pending: boolean;
  startedAt: number;
  responseCode?: number;
  timeout: number;
};

export type NodeStatus =
  | "idle"
  | "loading"
  | "access-rejected"
  | "access-granted";
