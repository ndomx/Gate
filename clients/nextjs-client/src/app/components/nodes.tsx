"use client";

import React from "react";
import { toast } from "react-toastify";
import { GateNode } from "@/utils/types";
import NodeCard from "./node-card";

type NodesProps = {
  nodes: GateNode[];
};

export default function Nodes({ nodes }: NodesProps) {
  const nodeOnClick = async (nodeId: string) => {
    toast.info("Activating device");
    // await activateNode(user.id, nodeId);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nodes.map((node, index) => (
        <NodeCard key={index} node={node} onClick={nodeOnClick} />
      ))}
    </div>
  );
}
