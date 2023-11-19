import { createContext, useContext, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "../configs/firebase-config";
import type { UseMutationResult } from "react-query";
import type { TAuthForm } from "../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { UseQueryResult } from "react-query";

type AuthData = {
  adminId: string;
  adminName: string;
  lastSeen: string;
};

type InititalCtx = {
  authWithEmail: UseMutationResult<
    User | undefined,
    unknown,
    TAuthForm,
    unknown
  >;
  signoutAdmin: () => void;
  checkAndRedirect: UseQueryResult<void, unknown>;
};

const AuthContext = createContext({} as InititalCtx);

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {

  const navigate = useNavigate();

  const authWithEmail = useMutation({
    mutationKey: ["email-signin"],
    mutationFn: async (authData: TAuthForm) => {
      try {
        const { email, password } = authData;

        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = response.user;

        return user;
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error(
            "email auth errors: ",
            error.message,
            error.code,
            error.name
          );
        }
      }
    }
  });

  const signoutAdmin = async () => signOut(auth).then((_) => navigate("/auth"));

  const checkAndRedirect = useQuery({
    queryKey: ["auth-data"],
    queryFn: () => console.log("fetch"),
    staleTime: Infinity
  });

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        return navigate("/auth");
      }

      return navigate("/");
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ authWithEmail, signoutAdmin, checkAndRedirect }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export type { AuthData, InititalCtx };

export { AuthProvider, useAuth };
