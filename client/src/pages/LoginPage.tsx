import { FaGoogle } from "react-icons/fa";
import { Button, Card } from "@radix-ui/themes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL

export default function LoginPage() {
  const handleLogin = () => {
    // api.get("/auth/google").then(() => console.log("success")).catch((e)=>{
    //   console.log(e)
    // });
    window.location.href =`${BASE_URL}/auth/google`;
  };
  return (
    <div className='flex flex-col justify-start gap-10 pt-25 items-center h-screen bg-linear-to-r from-cyan-100 via-blue-200 to-indigo-100'>
      <h1 className='text-4xl text-slate-800'>
        Welcome to <b>Edditor!</b>{" "}
      </h1>
      <Card className='bg-blue-200 flex justify-center items-center hover:bg-blue-400 '>
        <Button className='cursor-pointer' size={"4"} onClick={handleLogin}>
          <FaGoogle /> Sign in with Google
        </Button>
      </Card>
      {/* <footer className='bg-black w-full  text-center'>
        <small className='text-white'>&copy; Pradeep Tarakar 2025</small>
      </footer> */}
    </div>
  );
}
