import React, { createContext, ReactNode, useState } from "react";

interface TextContextType {
  textData: string | Blob;
  setTextData: React.Dispatch<React.SetStateAction<string>>;
}

export const textContext = createContext<TextContextType | undefined>(
  undefined
);

interface childrenType {
  children: ReactNode;
}

export default function TextContext({ children }: childrenType) {
  const [textData, setTextData] = useState<string>("");

  const exportObject = {
    textData,
    setTextData,
  };
  return (
    <textContext.Provider value={exportObject}>{children}</textContext.Provider>
  );
}
