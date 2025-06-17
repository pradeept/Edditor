import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import QuillEditor from "../components/QuilEditor";
import { useNavigate } from "react-router";
import { api } from "../utils/axiosConfig";
import Modal from "../components/Modal";
import { userContext } from "../context/UserContext";
import { modalContext } from "../context/ModalContext";

export default function HomePage() {
  const navigate = useNavigate();

  const { setEmail, setUser } = useContext(userContext);
  const { isModalOpen } = useContext(modalContext);

  useEffect(() => {
    api
      .get("/home")
      .then((res) => {
        console.log(res);
        setUser(res.data.msg.given_name);
        setEmail(res.data.msg.email);
        console.log("Authentication successful");
        // set username and email
      })
      .catch((e) => {
        if (e.response?.status == 401) {
          navigate("/");
        }
        console.log("error");
      });
  }, []);

  return (
    <>
      <div className='flex flex-col gap-8'>
        <NavBar />

        <Modal />
        <div className='px-10 shadow-2xl mx-10'>
          <QuillEditor />
        </div>
      </div>
    </>
  );
}
