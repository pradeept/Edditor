import { FaGoogle } from "react-icons/fa";
import { Button, Card } from "@radix-ui/themes";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const handleLogin = () => {
    window.location.href = `${BASE_URL}/auth/google`;
  };
  return (
    <>
      <div className='flex flex-col justify-start gap-10 pt-25 items-center min-h-screen bg-gradient-to-r from-cyan-100 via-blue-200 to-indigo-100'>
        <h1 className='text-4xl text-slate-800'>
          Welcome to <b>Edditor!</b>{" "}
        </h1>
        <Card className='bg-blue-200 flex justify-center items-center hover:bg-blue-400 '>
          <Button className='cursor-pointer' size={"4"} onClick={handleLogin}>
            <FaGoogle /> Sign in with Google
          </Button>
        </Card>
        <small>
          (Please sign in with your Google account to save your work to Drive!)
        </small>
        <footer className='text-center absolute bottom-0 bg-gradient-to-r from-cyan-100 via-blue-200 to-indigo-100  px-10 py-2 rounded-t-xl shadow-2xl hover:py-5 '>
          Made with ❤️ by{" "}
          <a href='https://pradeept.netlify.app' target='_blank'>
            <u>Pradeep Tarakar</u>
          </a>
        </footer>
      </div>
    </>
  );
}
