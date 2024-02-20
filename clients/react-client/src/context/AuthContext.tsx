import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

type ContextValues = {
  user: User | null;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
  logout: () => Promise<void>;
};

const UserContext = createContext<ContextValues | undefined>(undefined);

export function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ user, logout, resetPassword, signIn }}>
      {children}
    </UserContext.Provider>
  );
}

export function UserAuth() {
  return useContext(UserContext);
}
