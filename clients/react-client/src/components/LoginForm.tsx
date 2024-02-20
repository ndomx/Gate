import React, { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const auth = UserAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await auth?.signIn(email, password);
      navigate("/");
    } catch {
      console.log("unable to login");
    }
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
      </div>
      <form onSubmit={handleLogin}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="border p-3"
            type="password"
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
          Sign In
        </button>
      </form>

      <p className="text-end py-3 px-3">
        Forgot your password?{" "}
        <Link
          to="/account-recovery"
          className="text-blue-600 hover:text-blue-800 visited:text-purple-600"
        >
          Click here
        </Link>
      </p>
    </div>
  );
}
