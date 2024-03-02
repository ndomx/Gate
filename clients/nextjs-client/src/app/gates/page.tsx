import React from "react";
import { auth } from "@clerk/nextjs";
import { getUserNodes } from "@/utils/gate-client";
import Nodes from "../components/nodes";
import TopBanner from "../components/top-banner";
import { ToastContainer } from "react-toastify";

export default async function Gates() {
  const { userId } = auth();
  const { nodes } = await getUserNodes(userId || "");

  return (
    <>
      <div className="max-w-[600px] mx-auto my-1 p-4 container">
        <TopBanner title="Device List" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Nodes nodes={nodes || []} />
        </div>
      </div>
      <ToastContainer autoClose={2000} position="bottom-center" />
    </>
  );
}
