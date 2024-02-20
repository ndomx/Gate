import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function AccountRecoveryForm() {
  const auth = UserAuth();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    await auth?.resetPassword(email);
    toast.info("We've sent you an email with instructions");
  };

  return (
    <div className="max-w-[700px] mx-auto my-16 p-4">
      <div>
        <h1 className="text-2xl font-bold py-2">Recover your account</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col py-2">
          <label className="py-2 font-medium">Email Address</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border p-3"
            type="email"
          />
        </div>
        <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
          Reset your password
        </button>
      </form>
    </div>
  );
}
