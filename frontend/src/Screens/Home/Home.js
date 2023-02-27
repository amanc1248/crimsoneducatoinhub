import React, { useEffect, useState } from "react";

import { Sidebar } from "../../components/Sidebar";
import { TabContent } from "../TabContent";
import "../../styles/screens/home.css";
import { getOneModalAllDocuments } from "../../actions/homeActions";
import { useNavigate } from "react-router-dom";

export const Home = () => {
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
          navigate("/login");
        } else {
          navigate("/");
        }
      })
      .catch((e) => console.log(e));
  }, []);

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div className="home">
      <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex}></Sidebar>
      <TabContent tabIndex={tabIndex}></TabContent>
    </div>
  );
};
