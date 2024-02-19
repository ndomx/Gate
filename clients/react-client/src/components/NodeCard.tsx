import { useState } from "react";
import { GateNode, NodeStatus } from "../utils/types";
import { startStatusPolling } from "../utils/gate-client";
import AccessIcon from "./AccessIcon";

type NodeCardProps = {
  index: number;
  node: GateNode;
  onClick: (nodeId: string) => Promise<void>;
  onSuccess?: () => void;
  onReject?: () => void;
};

export default function NodeCard({ index, node, onClick }: NodeCardProps) {
  const [status, setStatus] = useState<NodeStatus>("idle");

  const handleOnClick = async () => {
    if (status !== "idle") {
      return;
    }

    setStatus("loading");

    try {
      await onClick(node.id);
    } catch {
      setStatus("access-rejected");
      return;
    }

    const responseCode = await startStatusPolling(node.id, 1000);
    console.log(responseCode);

    setStatus("access-granted");
  };

  return (
    <div
      key={index}
      className="bg-white p-4 rounded-md shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-300"
      onClick={handleOnClick}
    >
      <div>
        <h2 className="text-xl font-semibold">{node.displayName}</h2>
        <p className="text-gray-500">{node.actionCode}</p>
      </div>
      <AccessIcon status={status} />
    </div>
  );
}
