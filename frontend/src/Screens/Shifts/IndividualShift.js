import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ShiftModal } from "./ShiftModal";

export const IndividualShift = ({ shift, index, setRefresh }) => {
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

  return (
    <>
      {showModal && (
        <ShiftModal
          show={true}
          setShow={setShowModal}
          individualShift={shift}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></ShiftModal>
      )}

      <tr key={index}>
        <td>{index + 1}</td>
        <td>{shift.shiftName}</td>
        <td>{shift.startTime}</td>
        <td>{shift.endTime}</td>

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
