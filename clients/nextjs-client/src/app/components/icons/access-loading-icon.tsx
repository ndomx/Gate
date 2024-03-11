import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { ClipLoader } from "react-spinners";

export default function AccessLoadingIcon() {
  return (
    <div className="w-10 h-10 flex items-center justify-center bg-purple-500 text-white rounded-full relative">
      <div className="absolute inset-2">
        <IoIosArrowForward size={24} />
      </div>
      <div className="absolute inset-0">
        <ClipLoader
          color="#3b82f6"
          loading={true}
          // cssOverride={override}
          size={40}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    </div>
  );
}
