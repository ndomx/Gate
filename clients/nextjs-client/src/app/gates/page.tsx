import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserNodes } from "@/utils/gate-client";
import Nodes from "../components/nodes";
import TopBanner from "../components/top-banner";
import { ToastContainer } from "react-toastify";

export default async function Gates() {
  const { userId: authId } = auth();
  const res = await getUserNodes(authId || "");

  const nodes = res.nodes || [];
  const userId = res.user?.id || "";

  return (
    <>
      <div className="max-w-[600px] mx-auto my-1 p-4 container">
        <TopBanner title="Device List" />

        <div className="grid grid-cols-1 gap-4">
          <Nodes nodes={nodes} userId={userId} />
        </div>
      </div>
      <ToastContainer autoClose={2000} position="bottom-center" />
    </>
  );
}
