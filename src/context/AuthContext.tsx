import { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "react-query";
import { FirebaseError } from "firebase/app";
import {
  signInWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../configs/firebase-config";
import type { UseMutationResult } from "react-query";
import type { TAuthForm } from "../components/forms/AuthForm";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useAlert } from "./ToastContext";

type AuthData = {
  adminId: string;
  adminName: string;
  lastSeen: string;
};

type AdminProfiles = {
  name: string;
};

type InititalCtx = {
  adminProfiles: AuthData | null;
  authWithEmail: UseMutationResult<
    User | undefined,
    unknown,
    TAuthForm,
    unknown
  >;
  signoutAdmin: () => void;
  checkAndRedirect: () => void;
};

const AuthContext = createContext({} as InititalCtx);

type Props = {
  children: React.ReactNode;
};


const AuthProvider: React.FC<Props> = ({ children }) => {
  const [adminProfiles, setAdminProfiles] = useState<AuthData | null>(null);
  const { notifyBasicAlert } = useAlert();

  const navigate = useNavigate();

  console.log(adminProfiles)

  const getAdminProfiles = async (uid: string) => {
    try {
      const docReff = doc(db, "admin_profiles", uid);
      const getAdminProfile = await getDoc(docReff);

      if (getAdminProfile.exists()) {
        const adminData = getAdminProfile.data() as AdminProfiles;

        setAdminProfiles({
          adminName: adminData.name,
          adminId: uid,
          lastSeen: ""
        });
      } else {
        notifyBasicAlert({
          message: "Admin not exist",
          notifType: "error"
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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

        if (user) {
          await getAdminProfiles(user.uid);
        }

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

  const signoutAdmin = async () =>
    signOut(auth).then((_) => {
      navigate("/auth");
      setAdminProfiles(null);
    });

  const checkAndRedirect = async () => {
    try {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          await getAdminProfiles(user.uid);

          return navigate("/");
        }

        notifyBasicAlert({
          message: "User already logged out.",
          notifType: "info"
        });

        return navigate("/auth");
      });
    } catch (error) {
      if (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    checkAndRedirect();
  }, []);

  return (
    <AuthContext.Provider
      value={{ authWithEmail, signoutAdmin, checkAndRedirect, adminProfiles }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export type { AuthData, InititalCtx };

export { AuthProvider, useAuth };
