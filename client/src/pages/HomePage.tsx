import { useEffect } from "react";
import { redirect } from "react-router";
import { api } from "../utils/axiosConfig";

export default function HomePage() {
  const isLoggedin = () => {
    return true;
  };
  useEffect(() => {
    // if(!isLoggedin()){
    //     redirect('/') ;
    // }
    api
      .get("/home")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return <>Welcome</>;
}
