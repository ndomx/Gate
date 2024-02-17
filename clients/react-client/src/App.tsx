import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import { AuthContextProvider } from "./context/AuthContext";
import Nodes from "./components/Nodes";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Nodes />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
