import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUserNodes } from "../utils/gate-client";
import { GateNode, GateUser } from "../utils/types";

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
    <div className="max-w-[600px] mx-auto my-16 p-4">
      <h1 className="text-2xl font-bold py-4">Account</h1>
      <p>Welcome {user?.name}</p>

      <button onClick={handleLogout} className="border px-6 py-2 my-4">
        Logout
      </button>

      <ul>
        {nodes?.map((node) => (
          <li key={node.id}>{node.displayName}</li>
        ))}
      </ul>
    </div>
  );
}
