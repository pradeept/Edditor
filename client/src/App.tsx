import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={LoginPage} />
        <Route path='/home' Component={HomePage} />
      </Routes>
    </>
  );
}

export default App;
