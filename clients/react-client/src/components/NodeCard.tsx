import { GateNode } from "../utils/types";

type NodeCardProps = {
  node: GateNode;
  onSuccess?: () => void;
  onError?: () => void;
};

export default function NodeCard({ node }: NodeCardProps) {
  return (
    <div
      key={node.id}
      className="bg-white p-4 rounded-md shadow-md flex items-center justify-between cursor-pointer hover:bg-gray-100 transition duration-300"
      // onClick={() => onClick(node.id)}
    >
      <div>
        <h2 className="text-xl font-semibold">{node.displayName}</h2>
        <p className="text-gray-500">{node.actionCode}</p>
      </div>
      <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>
  );
}
