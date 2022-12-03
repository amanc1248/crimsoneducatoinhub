import React, { useEffect, useState } from "react";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { TutorsPresentational } from "./TutorsPresentational";

export const TutorsContainer = () => {
  // use states
  const [tutors, setTutors] = useState();
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  // use effects
  useEffect(() => {
    getOneModalTotalCount({
      url: "/api/commonRoute/getOneModalTotalCount",
      collectionName: "tutors",
    })
      .then((result) => {
        console.log("total documents: ", result);
        setTotalPages(result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    refresh &&
      getAllData({
        url: "/api/commonRoute/getData",
        collectionName: "tutors",
        pageNumber: currentPage,
        nPerPage: 3,
      })
        .then((result) => {
          setTutors(result);
          setRefresh(false);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [refresh]);

  useEffect(() => {
    getAllData({
      url: "/api/commonRoute/getData",
      collectionName: "tutors",
      pageNumber: currentPage,
      nPerPage: 3,
    })
      .then((result) => {
        setTutors(result);
        setRefresh(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);
  return (
    <TutorsPresentational
    showModal={showModal}
    setShowModal={setShowModal}
    tutors={tutors} 
    setTutors={setTutors} 
    setRefresh={setRefresh}
    currentPage={currentPage}
    totalPages={totalPages} 
    setCurrentPage={setCurrentPage}
    ></TutorsPresentational>
  );
};
