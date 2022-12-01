import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

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
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState();
  const phoneNumberRegex =
    /^\+?(?:977)?[ -]?(?:(?:(?:98|97)-?\d{8})|(?:01-?\d{7}))$/i;

  const navigate = useNavigate();

  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/verifyToken",
      collectionName: "users",
      token: localStorage.getItem("token"),
    })
      .then((result) => {
        if (result.login === false) {
          navigate("/login");
        } else {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const handleOnClickSubmit = () => {
    const doc = {
      phoneNumber,
      password,
    };
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert("Phone Number Invalid");
    } else if (phoneNumber && password) {
      insertData({
        url: "/api/commonRoute/login",
        collectionName: "users",
        doc,
      }).then((result) => {
        if (result.login === false) {
          alert("Username or password not found");
        } else if (result.login === true) {
          localStorage.setItem("token", result.token);
          navigate("/");
        }
      });
    }
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="img-fluid"
              alt="Sample image"
            />
          </MDBCol>

          <MDBCol col="4" md="6">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <h2 className="">Crimson Education Hub</h2>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Login Form</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              //   label="Phone Number"
              placeholder="Phone Number"
              id="formControlLg"
              size="lg"
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
              type="number"
            />
            <MDBInput
              wrapperClass="mb-4"
              //   label="Password"
              placeholder="Password"
              id="formControlLg"
              type="password"
              size="lg"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            {/* <div className="d-flex justify-content-between mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div> */}

            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                className="mb-0 px-5"
                size="lg"
                onClick={handleOnClickSubmit}
              >
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                Don't have an account?{" "}
                <a href="/signup" className="link-danger">
                  Register
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

export default Login;
