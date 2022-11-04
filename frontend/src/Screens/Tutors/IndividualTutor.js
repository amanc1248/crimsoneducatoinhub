import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { TutorModal } from "./TutorModal";

export const IndividualTutor = ({
  tutor,
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
      {showModal && (
        <TutorModal
          show={true}
          setShow={setShowModal}
          individualTutor={tutor}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></TutorModal>
      )}
      <tr key={index}>
        <td>{index}</td>
        <td>{tutor.name}</td>
        <td>{tutor.email}</td>
        <td>{tutor.phoneNumber}</td>
        <td>
          {tutor.courses}

          {/* {courses && 
                    courses.map((course, index) => {
                        <td>

                        </td>
                    })
                    } */}
        </td>
        <td>{tutor.age}</td>

        <td>{tutor.qualification}</td>
        <td>{tutor.startDate}</td>
        <td>{tutor.salary}</td>
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
