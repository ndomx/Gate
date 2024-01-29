import { NodeActionCode } from 'src/utils/types';

export interface Node {
  id: string;
  name: string;
  displayName: string;
  actionCode: NodeActionCode;
  deviceId: string;
}
