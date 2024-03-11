"use client";

import { NodeStatus } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AccessIcon from "./icons/access-icon";
import { startStatusPolling } from "@/utils/gate-client";
import { COMMAND_STATUS_RESPONSE_CODE } from "@/utils/constants";
import axios from "axios";

type NodeCardProps = {
  node: any;
  onClick: (nodeId: string) => Promise<void>;
  onSuccess?: () => void;
  onReject?: () => void;
};

export default function NodeCard({ node, onClick }: NodeCardProps) {
  const [status, setStatus] = useState<NodeStatus>("idle");

  useEffect(() => {
    if (status === "access-granted" || status === "access-rejected") {
      setTimeout(() => {
        setStatus("idle");
      }, 2000);
    }
  }, [status]);

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

    const { data } = await axios.get(`api/nodes/${node.id}/status`);
    console.log(data);
    if (data.status === COMMAND_STATUS_RESPONSE_CODE.OK) {
      toast.success("Access granted!");
      setStatus("access-granted");
    } else {
      toast.error(`Access denied (error=${data.status})`);
      setStatus("access-rejected");
    }
  };

  return (
    <div
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
