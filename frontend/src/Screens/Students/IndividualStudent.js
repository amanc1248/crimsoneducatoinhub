import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { AddStudent } from "./AddStudent";
export const IndividualStudent = ({ student, index}) => {

  const [type, setType] = useState('');
  const [shouldShow, setShouldShow]  =useState()


  // FUNCTIONS
  const handleOnClickUpdate = (data) => {
    setShouldShow(true)
    // setStudentModalType("update");
    // setShow(true);
    // setFetchAllDataAgain(false);
  };
  const handleOnClickDelete = () => {
    setShouldShow(true)
    // setStudents(data)
    // setStudentModalType("delete");
    // setShow(true);
    // setFetchAllDataAgain(false);
  };

  return (
    <>
    {/* <AddStudent
      student={student}
      type={type}
      shouldShow={shouldShow}
      // setFetchAllDataAgain,
    /> */}
      <tr key={index}>  
        <td>{index + 1}</td>
        <td>{student.name}</td>
        <td>{student.email}</td>
        <td>
          {/* {student.courses.map((course) => (
            <div key={course}>{course}</div>
          ))} */}
        </td>
        <td>{student.qualification}</td>
        <td>{student.startDate}</td>
        <td>{student.endDate}</td>
        <td>{student.feeStatus}</td>
        <td>
          <Button
            variant="success"
            size="sm"
            className="button__size"
            onClick={handleOnClickUpdate}
          >
            Update
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="button__size"
            onClick={handleOnClickDelete}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
