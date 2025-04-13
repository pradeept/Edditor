import { createContext, useState } from "react";
import NavBar from "../components/NavBar";
import QuillEditor from "../components/QuilEditor";
import { api } from "../utils/axiosConfig";
import { useNavigate } from "react-router";


// Better to move mycontext to a separate file  !!!!!!!
export const MyContext = createContext({});

export default function HomePage() {
  const [editorData, setEditorData] = useState();

  // useEffect(() => {
  //   api
  //     .get("/home")
  //     .then(() => {
  //       console.log("Authentication successful");
  //     })
  //     .catch((e) => {
  //       if (e.response?.status == 401) {
  //         navigate("/");
  //       }
  //       console.log("error");
  //     });
  // }, []);

  const handleDownload = ()=>{

  }

  return (
    <MyContext.Provider value={{editorData,setEditorData,handleDownload}}>
      <div className="flex flex-col gap-8">
        <NavBar />
        <div className='px-10'>
          <QuillEditor />
        </div>
      </div>
    </MyContext.Provider>
  );
}

