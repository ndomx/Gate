import { Navigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { PropsWithChildren } from "react";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const auth = UserAuth();

  if (!auth?.user) {
    return <Navigate to="/login" />;
  }

  return children;
}
