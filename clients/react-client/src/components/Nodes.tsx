import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { activateNode, getUserNodes } from "../utils/gate-client";
import { GateNode, GateUser } from "../utils/types";
import NodeCard from "./NodeCard";
import TopBanner from "./TopBanner";

export default function Nodes() {
  const [user, setUser] = useState<GateUser>();
  const [nodes, setNodes] = useState<GateNode[]>();

  const auth = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();

    await auth?.logout();
    console.log("Logged out");

    navigate("/login");
  };

  const nodeOnClick = async (nodeId: string) => {
    if (!user) {
      return;
    }

    await activateNode(user.id, nodeId);
  };

  useEffect(() => {
    async function loadNodes() {
      const authId = auth?.user?.uid;
      if (!authId) {
        return;
      }

      try {
        const res = await getUserNodes(authId);
        console.log(res);

        setUser(res.user);
        setNodes(res.nodes);
      } catch (e) {
        console.log(e);
      }
    }

    loadNodes();
  }, [auth?.user]);

  return (
    <div className="max-w-[600px] mx-auto my-1 p-4 container">
      <TopBanner
        userName={user?.name}
        sideButton={{ label: "Logout", onClick: handleLogout }}
      />

      <h1 className="text-3xl font-bold mb-4">Device List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {nodes?.map((node) => (
          <NodeCard node={node} onClick={nodeOnClick} />
        ))}
      </div>
    </div>
  );
}
