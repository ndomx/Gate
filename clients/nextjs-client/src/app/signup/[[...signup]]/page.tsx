import { SignUp } from "@clerk/nextjs";
import React from "react";

export default function Login() {
  return (
    <div className="mx-auto my-16 p-4 max-w-[700px]">
      <SignUp />
    </div>
  );
}
