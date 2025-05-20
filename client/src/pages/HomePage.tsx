import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import QuillEditor from "../components/QuilEditor";

import { useNavigate } from "react-router";
import { api } from "../utils/axiosConfig";
import Modal from "../components/Modal";
import ToastMessage from "../components/Toast/Toast";
import { toastContext } from "../context/ToastContext";
import { userContext } from "../context/UserContext";
import {toast, ToastContainer} from "react-toastify"

export default function HomePage() {
  const navigate = useNavigate();

  const { isToastOpen, setIsToastOpen } = useContext(toastContext);
  const { username, email, setEmail, setUsername } = useContext(userContext);

  const notify = () => toast("Wow so easy!");

  useEffect(() => {
    api
      .get("/home")
      .then((res) => {
        console.log(res);
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
        <div className='px-10'>
          <QuillEditor />
          <button onClick={() => setIsToastOpen(true)}>Open</button>
        </div>
      </div>
      {isToastOpen && (
        <ToastMessage
          message={"something"}
          type='error'
          title='error'
          duration={1000000}
          renderToast={isToastOpen}
        />
        //use react-toastify
      )}
    </>
  );
}
