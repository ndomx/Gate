import React from "react";
import { toast } from "react-toastify";
import { GateNode } from "@/utils/types";
import NodeCard from "./node-card";
import { auth } from "@clerk/nextjs";

export default function Nodes() {
  const nodeOnClick = async (nodeId: string) => {
    toast.info("Activating device");
    // await activateNode(user.id, nodeId);
  };

  return (
    <div className="max-w-[600px] mx-auto my-1 p-4 container">
      <h1 className="text-3xl font-bold mb-4">Device List</h1>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes?.map((node, index) => (
          <NodeCard key={index} node={node} onClick={nodeOnClick} />
        ))}
      </div> */}
    </div>
  );
}
