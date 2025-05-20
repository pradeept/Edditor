import { ReactNode } from "react";
import ModalContext from "./ModalContext";
import TextContext from "./TextContext";
import ToastContext from "./ToastContext";
import UserContext from "./UserContext";

type componentProps = {
  children: ReactNode;
};

export default function Provider({ children }: componentProps) {
  return (
    <UserContext>
      <TextContext>
        <ModalContext>
          <ToastContext>{children}</ToastContext>
        </ModalContext>
      </TextContext>
    </UserContext>
  );
}
