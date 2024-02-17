import { Route, Routes } from "react-router-dom";
import LoginForm from "./componentes/LoginForm";
import { AuthContextProvider } from "./context/AuthContext";
import Nodes from "./componentes/Nodes";

function App() {
  return (
    <>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Nodes />}/>
          <Route path="/login" element={<LoginForm />}/>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
