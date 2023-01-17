import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { getOneModalAllDocuments, insertData } from "../../actions/homeActions";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/verifyToken",
      collectionName: "users",
      token: localStorage.getItem("token"),
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
    })
      .then((result) => {
        if (result.login === false) {
          navigate("/signup");
        } else {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [position, setPosition] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [password, setPassword] = useState();
  const [cPassword, setCPassword] = useState();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s]{2,8}$/i;
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

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
      permissions: [],
      role: "",
    };

    if (password != cPassword) {
      alert("Password Not Match");
    } else if (!emailRegex.test(email)) {
      alert("Invalid Email");
    } else if (!phoneNumberRegex.test(phoneNumber)) {
      alert("Invalid Phone Number");
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
          alert("Number already used");
        } else if (result.signup === true) {
          alert("User Successfully Registered");
          navigate("/login");
        }
      });
    }
  };

  return (
    <div>
      <MDBContainer fluid className="p-3 my-1 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img src="./companylogo.PNG" class="img-fluid" alt="Sample image" />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h2 className="">Crimson Education Hub</h2>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Signup Form</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              //   label="Full Name"
              id="formControlLg"
              size="lg"
              placeholder="Full Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              type="text"
            />

            <MDBInput
              wrapperClass="mb-4"
              //   label="Email"
              id="formControlLg"
              size="lg"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Position"
              id="formControlLg"
              size="lg"
              placeholder="Position"
              onChange={(e) => {
                setPosition(e.target.value);
              }}
              type="text"
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Phone Number"
              id="formControlLg"
              type="number"
              size="lg"
              placeholder="Phone Number"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Address"
              id="formControlLg"
              type="text"
              size="lg"
              placeholder="Address"
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Password"
              id="formControlLg"
              type="password"
              size="lg"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Confirm Password"
              id="formControlLg"
              type="password"
              size="lg"
              placeholder="Confirm Password"
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                className="mb-0 px-5"
                size="lg"
                onClick={handleOnClickSubmit}
              >
                Register
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Already have an account?{" "}
                <a href="/login" className="link-danger">
                  Login
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>

        <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          <div className="text-white mb-3 mb-md-0">
            Crimson Education Hub © 2020. All rights reserved.
          </div>

          <div>
            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="facebook-f" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="twitter" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="google" size="md" />
            </MDBBtn>

            <MDBBtn
              tag="a"
              color="none"
              className="mx-3"
              style={{ color: "white" }}
            >
              <MDBIcon fab icon="linkedin-in" size="md" />
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </div>
  );
};

export default Signup;
