import React, { createContext, ReactNode, useState } from "react";

type userContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export const userContext = createContext<userContextType | undefined>(undefined);

type contextType = {
  children: ReactNode;
};

export default function UserContext({ children }: contextType) {
  const [user, setUser] = useState<string>("User");
  const [email, setEmail] = useState<string>("");

  const valueObj = {
    user,
    setUser,
    email,
    setEmail,
  };

  return (
    <userContext.Provider value={valueObj}>{children}</userContext.Provider>
  );
}
