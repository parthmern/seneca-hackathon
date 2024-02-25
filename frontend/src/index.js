import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppContextProvider from "./context/AppContext";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <AppContextProvider>
      <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
  </AppContextProvider>

    
  
);
