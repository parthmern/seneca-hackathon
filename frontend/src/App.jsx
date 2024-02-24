import { Route, Router, Routes } from "react-router-dom";
import "./App.css";
import  HomePage from "./pages/HomePage";
import UserDetails from "./pages/UserDetails";

function App() {
  return (
    <div>
      <Routes>
    
      <Route path="/" element={<HomePage/>} />
      <Route path="/user-details" element={<UserDetails/>} />
      
    </Routes>
    </div>
    
  );
}

export default App;
