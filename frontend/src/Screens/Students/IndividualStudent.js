import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { EnrolledCoursesModal } from "./EnrolledCoursesStudents";
import { StudentModal } from "./StudentModal";

export const IndividualStudent = ({ student, index, setRefresh }) => {
  const [showModal, setShowModal] = useState(false);
  const [courseModalType, setCourseModalType] = useState();
  const [showAssignedCourse, setShowAssignedCourse] = useState(false);

  // functions
  const onHandleUpdate = () => {
    setCourseModalType("Update");
    setShowModal(true);
  };
  const onHandleDelete = () => {
    setCourseModalType("delete");
    setShowModal(true);
  };
  const onHandleAssignedCourses = () => {
    setShowAssignedCourse(true);
  };
  return (
    <>
      {showModal && (
        <StudentModal
          show={true}
          setShow={setShowModal}
          individualStudent={student}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></StudentModal>
      )}
      {showAssignedCourse && (
        <EnrolledCoursesModal
          show={true}
          setShow={setShowAssignedCourse}
          individualStudent={student}
          setRefresh={setRefresh}
        />
      )}
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.phoneNumber}</td>
        <td>{student.parentPhoneNumber}</td>

        <td>{student.qualification}</td>
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
            variant="warning"
            size="sm"
            className="button__size  mr-1 ml-1"
            onClick={onHandleAssignedCourses}
          >
            Enrolled Courses
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
