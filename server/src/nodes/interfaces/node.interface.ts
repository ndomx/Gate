import { NodeActionCode } from 'src/common/types';

export interface Node {
  id: string;
  name: string;
  displayName: string;
  actionCode: NodeActionCode;
  deviceId: string;
}
