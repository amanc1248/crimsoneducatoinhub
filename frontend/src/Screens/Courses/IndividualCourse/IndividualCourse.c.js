import React, { useState } from "react";
import { IndividualCoursePresentational } from "./IndividualCourse.p";

export const IndividualCourseContainer = ({
  course,
  index,
  setRefresh
}) => {

  // usestates
  const [showModal, setShowModal]            = useState(false);
  const [courseModalType, setCourseModalType]      = useState();
  

  // functions
  const onHandleUpdate = () => {
    setCourseModalType("Update")
    setShowModal(true)
  };
  const onHandleDelete = () => {
    setCourseModalType("delete")
    setShowModal(true)
  };
  return (
    <IndividualCoursePresentational
    course={course}
    index={index}
    setRefresh={setRefresh}
    showModal={showModal}
    setShowModal={setShowModal}
    onHandleUpdate={onHandleUpdate}
    onHandleDelete={onHandleDelete}
    courseModalType={courseModalType}
    ></IndividualCoursePresentational>
  );
};
