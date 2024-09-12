import { useState } from "react";
import Header from "./Header";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import background from "./assets/background2.svg";
import upload from "./assets/upload.svg";
import pdfIcon from "./assets/pdf-icon.svg";
import Home from "./Home";
import Dashboard from "./Dashboard";
import { RequireToken } from "./Auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [count, setCount] = useState(0);
  const config = {
    theme: {
      token: {
        itemSelectedBg: "#000000",
      },
    },
  };
  return (
    // <Home/>
    // <Dashboard/>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        <ToastContainer position="top-center" theme="light" />
      </div>
  );
}

export default App;
