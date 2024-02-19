import { IoIosArrowForward } from "react-icons/io";
import { MdLock, MdLockOpen } from "react-icons/md";
import { NodeStatus } from "../utils/types";

type AccessIconProps = {
  status: NodeStatus;
};

export default function AccessIcon({ status }: AccessIconProps) {
  switch (status) {
    case "idle":
      return (
        <div className="w-10 h-10 flex items-center justify-center bg-blue-500 text-white rounded-full">
          <IoIosArrowForward size={24} />
        </div>
      );
    case "loading":
      return (
        <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full">
          <IoIosArrowForward size={24} />
        </div>
      );
    case "access-rejected":
      return (
        <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full">
          <MdLock size={24} />
        </div>
      );
    case "access-granted":
      return (
        <div className="w-10 h-10 flex items-center justify-center bg-green-400 text-white rounded-full">
          <MdLockOpen size={24} />
        </div>
      );
  }
}
