import React, { useState } from "react";
import { IndividualShiftP } from "./IndividualShift.p";

export const IndividualShiftC = ({ shift, index, setRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [courseModalType, setCourseModalType] = useState();

  // functions
  const onHandleUpdate = () => {
    setCourseModalType("Update");
    setShowModal(true);
  };
  const onHandleDelete = () => {
    setCourseModalType("delete");
    setShowModal(true);
  };

  return (
    <IndividualShiftP
    shift={shift}
    index={index}
    setRefresh={setRefresh}
    showModal={showModal}
    setShowModal={setShowModal}
    courseModalType={courseModalType}
    onHandleUpdate={onHandleUpdate}
    onHandleDelete={onHandleDelete}
    ></IndividualShiftP>
  );
};
