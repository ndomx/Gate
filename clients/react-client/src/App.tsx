import LoginForm from "./componentes/LoginForm";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <LoginForm />
      </AuthContextProvider>
    </>
  );
}

export default App;
