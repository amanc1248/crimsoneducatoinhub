import { Routes, Route } from "react-router-dom";

import "./App.css";
import { Home } from "./Screens/Home/Home";
import Login from "./Screens/LoginSignup/Login";
import Signup from "./Screens/LoginSignup/Signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              {/* <Home></Home> */}
              <Login></Login>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
