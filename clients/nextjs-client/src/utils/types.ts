import { COMMAND_STATUS_RESPONSE_CODE } from "./constants";

export type GateUser = {
  id: string;
  access: string[];
  externalId: string;
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

export type CommandStatusResponse = {
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

export type CommandStatusResponseCode =
  (typeof COMMAND_STATUS_RESPONSE_CODE)[keyof typeof COMMAND_STATUS_RESPONSE_CODE];
