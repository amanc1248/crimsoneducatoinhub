import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { CourseModal } from "./CourseModal";

export const IndividualCourse = ({
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
    <>
    {showModal &&  <CourseModal show={true} setShow={setShowModal}  individualCourse={course} courseModalType={courseModalType} setRefresh={setRefresh} ></CourseModal>}
      <tr>
        <td>{index + 1}</td>
        <td>{course.courseName}</td>
        <td>{course.time}</td>

        <td>{course.fee}</td>

        <td style={{ width: "300px", textAlign: "center" }}>
          {" "}
          {course.courseDetails}
        </td>
        <td>
          <Button
            variant="success"
            size="sm"
            className="button__size"
            onClick={onHandleUpdate}
          >
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="button__size"
            onClick={onHandleDelete}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
