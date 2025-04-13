import { Route, Routes } from "react-router";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import "./App.css"

function App() {
  return (
    <>
      <Routes>
        <Route path='/' Component={LoginPage} />
        {/*No need for authguard. Since, authorization is handled on the server side */}
        {/* <Route path='/home' element={<AuthGuard><HomePage /></AuthGuard>} /> */}
        <Route path="/home" Component={HomePage} />
      </Routes>
    </>
  );
}

export default App;
