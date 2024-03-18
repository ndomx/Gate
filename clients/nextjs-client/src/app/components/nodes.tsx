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
    <>
      {nodes.map((node, index) => (
        <NodeCard key={index} node={node} onClick={nodeOnClick} />
      ))}
    </>
  );
}
