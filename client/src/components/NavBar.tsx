import { DiGoogleDrive } from "react-icons/di";
import { Navigate } from "react-router";
import { api } from "../utils/axiosConfig";
import { Button } from "@radix-ui/themes";
import { FaDownload } from "react-icons/fa6";
import { useContext } from "react";
import { MyContext } from "../pages/HomePage";
import { FiLogOut } from "react-icons/fi";

export default function NavBar() {
  const { handleDownload } = useContext(MyContext);
  const handleLogout = () => {
    api
      .get("/auth/logout")
      .then(() => {
        Navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
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
            <Button>
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
