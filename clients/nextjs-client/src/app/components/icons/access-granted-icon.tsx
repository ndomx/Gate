import React from "react";
import { MdLockOpen } from "react-icons/md";

export default function AccessGrantedIcon() {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-green-400 text-white rounded-full">
      <MdLockOpen size={24} />
    </div>
  );
}
