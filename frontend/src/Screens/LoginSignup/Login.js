import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

// import {eye}
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { IconBase } from "react-icons";

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
  const [code, setCode] = useState();
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
      code,
    };
    if (!phoneNumberRegex.test(phoneNumber)) {
      alert("Phone Number Invalid");
    } else if (phoneNumber && password && code) {
      insertData({
        url: "/api/commonRoute/login",
        collectionName: "users",
        doc,
      }).then((result) => {
        if (result.login === false) {
          alert("Username or password not found");
        } else if (result.code === false) {
          alert("Code not matched");
        } else if (result.login === true) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("userId", result.result._id);
          navigate("/");
        }
      });
    }
  };

  const [icon, setIcon] = useState();

  return (
    <div style={{ marginTop: "100px" }}>
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col="10" md="6">
            <img src="./companylogo.PNG" class="img-fluid" alt="Sample image" />
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
            <div>
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
              >
                {" "}
              </MDBInput>
              {/* <IconBase icon={icon} /> */}
            </div>
            <div>
              <MDBInput
                wrapperClass="mb-4"
                placeholder="Code"
                id="formControlLg"
                type="password"
                size="lg"
                onChange={(e) => {
                  setCode(e.target.value);
                }}
              >
                {" "}
              </MDBInput>
            </div>

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
        </div>
      </MDBContainer>
    </div>
  );
};

export default Login;
