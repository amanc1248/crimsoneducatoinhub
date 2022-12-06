import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { insertData } from "../actions/homeActions";

import "../styles/components/components.css";

export const LoggedInUser = ({ name, image, title }) => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const doc = localStorage.getItem("userId");

    insertData({
      url: "/api/commonRoute/getUserId",
      collectionName: "users",
      doc,
    }).then((response) => {
      setUserData(response);
    });
  }, []);

  return (
    <div className="logged__in__user">
      {/* <img src={image} alt="loggedInUser" className="user__image" /> */}
      <Avatar facebookId="100008343750912" size="100" />
      <div className="user__name">{userData && userData.name}</div>
      <div className="user__title">{userData && userData.position}</div>
    </div>
  );
};
