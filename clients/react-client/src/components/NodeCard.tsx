import { useState } from "react";
import { GateNode } from "../utils/types";
import { startStatusPolling } from "../utils/gate-client";
import { IoIosArrowForward } from "react-icons/io";

type NodeCardProps = {
  node: GateNode;
  onClick: (nodeId: string) => Promise<void>;
  onSuccess?: () => void;
  onReject?: () => void;
};

export default function NodeCard({ node, onClick }: NodeCardProps) {
  const [waiting, setWaiting] = useState(false);

  const handleOnClick = async () => {
    if (waiting) {
      return;
    }

    setWaiting(true);

    try {
      await onClick(node.id);
    } catch {
      setWaiting(false);
      return;
    }

    const responseCode = await startStatusPolling(node.id, 1000);
    console.log(responseCode);

    setWaiting(false);
  };

  return (
    <div
      key={node.id}
      className="bg-white p-4 rounded-md shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-300"
      onClick={handleOnClick}
    >
      <div>
        <h2 className="text-xl font-semibold">{node.displayName}</h2>
        <p className="text-gray-500">{node.actionCode}</p>
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
        <IoIosArrowForward size={24} />
      </div>
    </div>
  );
}
