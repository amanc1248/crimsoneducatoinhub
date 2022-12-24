import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { ShiftModalContainer } from "../ShiftModal/ShiftModa.c";

export const IndividualShiftP = ({
  shift,
  index,
  setRefresh,
  showModal,
  setShowModal,
  courseModalType,
  onHandleUpdate,
  onHandleDelete,
}) => {
  return (
    <>
      {showModal && (
        <ShiftModalContainer
          show={true}
          setShow={setShowModal}
          individualShift={shift}
          courseModalType={courseModalType}
          setRefresh={setRefresh}
        ></ShiftModalContainer>
      )}

      <tr key={index}>
        <td>{index + 1}</td>
        <td>{shift.name}</td>
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
