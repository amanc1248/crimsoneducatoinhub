import React, { useEffect, useState } from "react";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { ShiftsPresentational } from "./Shifts.p";
import ShiftClass from "../../classes/Shifts.class";

export const ShiftsContainer = () => {

  // use states
  const [shifts, setShifts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [unModifiableOrignalList, setUnModifiableOrignalList] = useState([]);

  // use effects
  useEffect(() => {
    getOneModalTotalCount({
      url: "/api/commonRoute/getOneModalTotalCount",
      collectionName: "shifts",
      checkPermission:'read',
        userId:localStorage.getItem('userId')
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
        collectionName: "shifts",
        pageNumber: currentPage,
        nPerPage: 100,
        checkPermission:'read',
        userId:localStorage.getItem('userId')
      })
        .then((result) => {
          const list = result.map((shift, i)=>{
            const shiftObj  = new ShiftClass({
                id:shift._id,
                name:shift.name,
                startTime:shift.startTime,
                endTime:shift.endTime,
            })
            return shiftObj;
        })
        setUnModifiableOrignalList(result);
        setShifts(list);
        setRefresh(false);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [refresh]);

  useEffect(() => {
    getAllData({
      url: "/api/commonRoute/getData",
      collectionName: "shifts",
      pageNumber: currentPage,
      nPerPage: 100,
      checkPermission:'read',
        userId:localStorage.getItem('userId')
    })
      .then((result) => {
        const list = result.map((shift, i)=>{
          const shiftObj  = new ShiftClass({
              id:shift._id,
              name:shift.name,
              startTime:shift.startTime,
              endTime:shift.endTime,
          })
          return shiftObj;
      })
      setUnModifiableOrignalList(result);
      setShifts(list);
      setRefresh(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  return (
    <ShiftsPresentational
      showModal={showModal}
      setShowModal={setShowModal}
      shifts={shifts}
      setShifts={setShifts}
      setRefresh={setRefresh}
      unModifiableOrignalList={unModifiableOrignalList}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    ></ShiftsPresentational>
  );
};
