import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { TutorModalContainer } from "./TutorModal/TutorModalContainer";
import { AssignedCoursesContainer } from "./AssignedCoursesModal/AssignedCourseContainer";
// import { TutorModal } from "./TutorModal";

export const IndividualTutor = ({ tutor, index, setRefresh }) => {
  // usestates
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
        <TutorModalContainer
          show={true}
          setShow={setShowModal}
          individualTutor={tutor}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></TutorModalContainer>
      )}

      {showAssignedCourse && (
        <AssignedCoursesContainer
          show={true}
          setShow={setShowAssignedCourse}
          individualTutor={tutor}
          setRefresh={setRefresh}
        />
      )}
      <tr key={index}>
        <td>{index}</td>
        <td>{tutor.name}</td>
        <td>{tutor.email}</td>
        <td>{tutor.phoneNumber}</td>
        <td>{tutor.age}</td>

        <td>{tutor.qualification}</td>
        <td>{tutor.startDate}</td>
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
            Assigned Courses
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
