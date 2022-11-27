import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { insertData } from "../../actions/homeActions";

const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();

  const handleOnClickSubmit = () => {
    const doc = {
      name,
      email,
      position,

      phoneNumber,
      address,
      password,
      cPassword,
      date: new Date(),
    };

    if (password != cPassword) {
      alert("Pass Not Match");
    } else if (
      name &&
      email &&
      position &&
      phoneNumber &&
      address &&
      password &&
      cPassword
    ) {
      insertData({
        url: "/api/commonRoute/signup",
        collectionName: "users",
        doc,
      }).then((result) => {
        if (result.signup === false) {
          alert("number already used");
        } else if (result.signup === true) {
          alert("user created");
        }
      });
    }
  };

  return (
    <div>
      This is SignUp Form
      <div>
        <div>
          <label for="name">Full Name</label>
          <input
            id="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
          ></input>
        </div>

        <div>
          <label for="email">Email</label>
          <input
            id="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
          ></input>
        </div>

        <div>
          <label for="position">Position</label>
          <input
            id="position"
            onChange={(e) => {
              setPosition(e.target.value);
            }}
            type="text"
          ></input>
        </div>
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
        <div>
          <label for="cpassword">Confirm Password</label>
          <input
            id="cpassword"
            onChange={(e) => {
              setCPassword(e.target.value);
            }}
            type="text"
          ></input>
        </div>
        <div>
          <label for="address">Address</label>
          <input
            id="address"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
            type="text"
          ></input>
        </div>
      </div>
      <Button onClick={handleOnClickSubmit}>Submit</Button>
    </div>
  );
};

export default Signup;
