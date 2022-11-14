import { Button } from "@mui/material";
import React, { useState } from "react";
import { insertData } from "../../actions/homeActions";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();

  const handleOnClickSubmit = () => {
    const doc = {
      phoneNumber,
      password,
    };
    if (phoneNumber && password) {
      insertData({
        url: "/api/commonRoute/login",
        collectionName: "users",
        doc,
      }).then((result) => {
        if (result.login === false) {
          alert("User not found");
        } else if (result.login === true) {
          alert("GOOD TO GO");
        }
      });
    }
  };
  return (
    <div>
      This is Login Form
      <div>
        <div>
          <label for="phnNumber">Phone Number</label>
          <input
            id="phnNumber"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            type="number"
          ></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input
            id="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="text"
          ></input>
        </div>
      </div>
      <Button onClick={handleOnClickSubmit}>Submit</Button>
    </div>
  );
};

export default Login;
