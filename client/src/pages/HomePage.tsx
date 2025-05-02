import { useEffect } from "react";
import NavBar from "../components/NavBar";
import QuillEditor from "../components/QuilEditor";

import TextContext from "../context/TextContext";
import { useNavigate } from "react-router";
import { api } from "../utils/axiosConfig";

export default function HomePage() {

  const navigate = useNavigate()

  useEffect(() => {
    api
      .get("/home")
      .then(() => {
        console.log("Authentication successful");
      })
      .catch((e) => {
        if (e.response?.status == 401) {
          navigate("/");
        }
        console.log("error");
      });
  }, []);

  return (
    <TextContext>
      <div className='flex flex-col gap-8'>
        <NavBar />
        <div className='px-10'>
          <QuillEditor />
        </div>
      </div>
    </TextContext>
  );
}
