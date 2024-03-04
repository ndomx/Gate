"use client";

import React from "react";
import { toast } from "react-toastify";
import { GateNode } from "@/utils/types";
import NodeCard from "./node-card";
import axios from "axios";

type NodesProps = {
  userId: string;
  nodes: GateNode[];
};

export default function Nodes({ nodes, userId }: NodesProps) {
  const nodeOnClick = async (nodeId: string) => {
    toast.info("Activating device");
    await axios.post("/api/nodes/activate", { userId, nodeId });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {nodes.map((node, index) => (
        <NodeCard key={index} node={node} onClick={nodeOnClick} />
      ))}
    </div>
  );
}
