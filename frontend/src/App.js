import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getOneModalAllDocuments } from "./actions/homeActions";

import "./App.css";
import { Home } from "./Screens/Home/Home";
import Login from "./Screens/LoginSignup/Login";
import Signup from "./Screens/LoginSignup/Signup";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="App">
      <ToastContainer />

      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />

        <Route path="/login" element={<Login></Login>} />
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
