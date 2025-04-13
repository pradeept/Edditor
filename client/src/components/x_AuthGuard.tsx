import { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router";
import { api } from "../utils/axiosConfig";

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoggedIn, setIsloggedIn] = useState<boolean>(false);
  useEffect(() => {
    checkApi();
    // make axios call to server
    // get's true or false
    setIsloggedIn(true);
  }, []);
  const checkApi = async () => {
    const resp = await api.get("/auth/isLoggedIn");
    console.log(resp);
  };
  //   return isLoggedIn ? children : <Navigate to={"/"} />;
  return children;
}
