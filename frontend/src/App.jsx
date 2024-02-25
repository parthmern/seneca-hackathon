import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import  HomePage from "./pages/HomePage";
import UserDetails from "./pages/UserDetails";
import ProfileMatchePage from "./pages/ProfileMatchePage";
import RegistrationForm from "./pages/RegistrationForm";
import LoginForm from "./pages/LoginForm";
import { Navbar } from "./componentsPageWise/Navbar";

function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
    
      <Route path="/" element={<HomePage/>} />
      <Route path="/user-details" element={<UserDetails/>} />
      <Route path="/profile-match" element={<ProfileMatchePage />} />
      <Route path="/register" element={<RegistrationForm />} />
      <Route path="/login" element={<LoginForm/>}></Route>
      
    </Routes>
    </div>
    
  );
}

export default App;
