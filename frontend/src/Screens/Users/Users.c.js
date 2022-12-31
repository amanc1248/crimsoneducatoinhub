import React, { useState, useEffect } from "react";
import {
  getAllData,
  getOneModalDocumentsById,
} from "../../actions/homeActions";
import { UsersP } from "./Users.p";

export const UsersC = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [role,setRole]= useState('');
  useEffect(() => {
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "users",
      filter: { _id: localStorage.getItem("userId") },
    }).then((result) => {
      if (result[0]?.role === "admin") {
        setRole(result[0]?.role);
        getAllData({
          url: "/api/commonRoute/getData",
          collectionName: "users",
          pageNumber: currentPage,
          nPerPage: 100,
        }).then((result) => {
          setUsers(result);
        });
      }
    });
  }, []);

  return role==='admin' ? <UsersP users={users}></UsersP>: "Not authorized";
};
