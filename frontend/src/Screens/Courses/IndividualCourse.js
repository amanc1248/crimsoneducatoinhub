import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { CourseModal } from "./CourseModal";

export const IndividualCourse = ({
  course,
  index
}) => {

  // usestates
  const [showModal, setShowModal]            = useState(false);
  

  // functions
  const onHandleUpdate = () => {
    setShowModal(true)
  };
  const onHandleDelete = () => {
    setShowModal(true)
  };
  return (
    <>
    <CourseModal show={showModal} setShow={setShowModal}  individualCourse={course} ></CourseModal>
      <tr>
        <td>{index}</td>
        <td>{course.courseName}</td>
        <td>{course.time}</td>

        <td>{course.fee}</td>

        <td style={{ width: "300px", textAlign: "left" }}>
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
