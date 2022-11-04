import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { StudentModal } from "./StudentModal";

export const IndividualStudent = ({ 
  student,
  index,
  setRefresh}) => {

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
        {showModal &&  <StudentModal show={true} setShow={setShowModal}  individualStudent={student} courseModalType={courseModalType} setRefresh={setRefresh} ></StudentModal>}

      <tr key={index}>  
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>{student.phoneNumber}</td>

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
