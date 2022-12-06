import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getOneModalAllDocuments } from "./actions/homeActions";

import "./App.css";
import { Home } from "./Screens/Home/Home";
import Login from "./Screens/LoginSignup/Login";
import Signup from "./Screens/LoginSignup/Signup";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getOneModalAllDocuments({
  //     url: "/api/commonRoute/verifyToken",
  //     collectionName: "users",
  //     token: localStorage.getItem("token"),
  //   })
  //     .then((result) => {
  //       if (result.login === false) {
  //         setUserLoggedIn(false);
  //         // // navigate("/login");
  //         // console.log(result);
  //         // console.log("False");
  //       } else {
  //         navigate("/");
  //         setUserLoggedIn(true);
  //         // console.log("false");
  //         // console.log("RUE");
  //       }
  //     })
  //     .catch((e) => console.log(e));
  // }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} />

        <Route path="/login" element={<Login></Login>} />
        <Route path="/" element={<Home></Home>} />
      </Routes>
    </div>
  );
}

export default App;
