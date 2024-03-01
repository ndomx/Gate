"use client";

import { NodeStatus } from "@/utils/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AccessIcon from "./icons/access-icon";

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

    const responseCode = 200; // await startStatusPolling(node.id, 1000);
    if (responseCode === 200) {
      toast.success("Access granted!");
      setStatus("access-granted");
    } else {
      toast.error(`Access denied (error=${responseCode})`);
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
