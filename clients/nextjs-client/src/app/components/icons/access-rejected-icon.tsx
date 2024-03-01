import React from "react";
import { MdLock } from "react-icons/md";

export default function AccessRejectedIcon() {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-full">
      <MdLock size={24} />
    </div>
  );
}
