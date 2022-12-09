import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  deleteData,
  insertData,
  updateData,
} from "../../../actions/homeActions";
import { ShiftModalPresentational } from "./ShiftModal.p";

export function ShiftModalContainer({
  show,
  setShow,
  individualShift,
  courseModalType,
  setRefresh,
}) {
  console.log("Individual shift: ", individualShift);
  //   usestates
  // USESTATES
  const [shift, setShift] = useState({
    id:individualShift && individualShift.id,
    name: individualShift && individualShift.name,
    startTime: individualShift && individualShift.startTime,
    endTime: individualShift && individualShift.endTime,
  });

  // functions
  // 1. on adding shifts
  const handleOnClickSubmit = () => {
    if (shift.name && shift.startTime && shift.endTime) {
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "shifts",
        doc: shift
      })
        .then((result) => {
          setRefresh(true);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 2. closing course modal
  const handleClose = () => {
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = () => {
    if (shift.name && shift.startTime && shift.endTime) {
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "shifts",
        updatedTo: shift,
        id: individualShift.id,
      })
        .then((result) => {
          setRefresh(true);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 4. on deleting course
  const handleOnClickDelete = () => {
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualShift.id}&collectionName=shifts`,
    })
      .then((result) => {
        setRefresh(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };
  // console.log("individual Shift: ", shift)
  return (
    <ShiftModalPresentational
      show={show}
      setShow={setShow}
      shift={shift}
      setShift = {setShift}
      courseModalType={courseModalType}
      setRefresh={setRefresh}
      handleClose={handleClose}
      handleOnClickSubmit={handleOnClickSubmit}
      handleOnClickDelete={handleOnClickDelete}
      handleOnClickUpdate={handleOnClickUpdate}
    ></ShiftModalPresentational>
  );
}
