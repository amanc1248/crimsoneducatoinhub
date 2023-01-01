import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { CourseModalContainer } from "../CoursesModal/CourseModal.c";

export const IndividualCoursePresentational = ({
  course,
  index,
  setRefresh,
  showModal,
  setShowModal,
  onHandleUpdate,
  onHandleDelete,
  courseModalType,
}) => {
  return (
    <>
      {showModal && (
        <CourseModalContainer
          show={true}
          setShow={setShowModal}
          individualCourse={course}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></CourseModalContainer>
      )}
      <tr>
        <td>{index + 1}</td>
        <td>{course.courseName}</td>
        <td>{course.courseDuration}</td>

        <td>{course.courseFee}</td>

        <td style={{ width: "300px", textAlign: "center" }}>
          {" "}
          {course.courseDetails}
        </td>
        <td>{course.typeClass}</td>
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
