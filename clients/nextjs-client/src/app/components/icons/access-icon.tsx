import { NodeStatus } from "@/utils/types";
import AccessIdleIcon from "./access-idle-icon";
import AccessLoadingIcon from "./access-loading-icon";
import AccessGrantedIcon from "./access-granted-icon";
import AccessRejectedIcon from "./access-rejected-icon";

type AccessIconProps = {
  status: NodeStatus;
};

export default function AccessIcon({ status }: AccessIconProps) {
  switch (status) {
    case 'idle': return <AccessIdleIcon />
    case 'loading': return <AccessLoadingIcon />
    case 'access-granted': return <AccessGrantedIcon />
    case 'access-rejected': return <AccessRejectedIcon />
    default: return <AccessIdleIcon />
  }
}
