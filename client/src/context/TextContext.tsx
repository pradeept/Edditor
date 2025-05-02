import { createContext, ReactNode, useState } from "react";
// 1. Define the shape of the context value
interface TextContextType {
  textData: string;
  setTextData: React.Dispatch<React.SetStateAction<string>>;
}

// 2. Create the context with a default value or undefined
export const textContext = createContext<TextContextType | undefined>(undefined);

interface Mycontext{
  children: ReactNode
}

export default function TextContext({ children }:Mycontext) {
  const [textData, setTextData] = useState("");

  return (
    <textContext.Provider value={{ textData, setTextData }}>
      {children}
    </textContext.Provider>
  );
}
