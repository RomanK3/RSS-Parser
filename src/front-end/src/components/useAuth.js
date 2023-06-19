import React, { useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";

const authContext = createContext({});

function useProvideAuth() {
  const navigate = useNavigate();

  const signIn = (token) => {
    localStorage.setItem("token", token);
    navigate("/", { replace: true });
  };

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return {
    token: localStorage.getItem("token"),
    user: localStorage.getItem("user"),
    signIn,
    signOut,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};
