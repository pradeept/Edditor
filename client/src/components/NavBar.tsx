import { DiGoogleDrive } from "react-icons/di";
import { useNavigate } from "react-router-dom";
import { api } from "../utils/axiosConfig";
import { Button } from "@radix-ui/themes";
import { FaDownload } from "react-icons/fa6";
import { useContext} from "react";
import { FiLogOut } from "react-icons/fi";
import FileSaver from "file-saver";
import * as quillToWord from "quill-to-word";
import { textContext } from "../context/TextContext";
import { modalContext } from "../context/ModalContext";

export default function NavBar() {
  const navigate = useNavigate()
  const {textData} = useContext(textContext);
  const { setIsModalOpen} = useContext(modalContext)

  const handleLogout = () => {
    api
      .get("/auth/logout")
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleDownload = async () => {
    console.log(textData)
    const blob = await quillToWord.generateWord(textData, {
        exportAs: "blob",
      });
    
    const fileName = new Date();
    FileSaver.saveAs(blob, `${fileName}.docx`);
  };


  return (
    <>
      <nav className=' bg-black text-white grid grid-cols-6 content-center items-stretch'>
        <div className='col-span-2 flex flex-col justify-center items-start pl-2'>
          <h2>Welcome User ...!</h2>
        </div>
        <div className='col-span-2 flex flex-col justify-center items-center pl-2 '>
          <h1 className='text-2xl font-semibold'>
            <a href='/' className='font-mono'>
              Edditor
            </a>
          </h1>
        </div>
        <div className='col-span-2 flex justify-end pr-10 items-center'>
          <div className='flex items-center p-2'>
            <Button
              color='lime'
              className='cursor-pointer'
              onClick={handleDownload}
            >
              Download <FaDownload size={18} className='cursor-pointer' />
            </Button>
          </div>
          <div className='flex items-center p-2'>
            <Button onClick={()=>setIsModalOpen(true)}>
              Save to drive{" "}
              <DiGoogleDrive size={24} className='cursor-pointer' />
            </Button>
          </div>
          <Button color='red' onClick={handleLogout}>
            <FiLogOut className='cursor-pointer' />
          </Button>
        </div>
      </nav>
    </>
  );
}
