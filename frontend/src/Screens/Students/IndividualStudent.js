import React, {useState} from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import {AddStudent} from "./AddStudent"
export const IndividualStudent = ({ student, index }) => {
  const [type, setType] = useState('');
  const [show, setShow]                           = useState(false);
  const [fetchAllDataAgain, setFetchAllDataAgain] = useState(false);

  // FUNCTIONS
  const handleOnClickUpdate = ()=>{
    setType('update');
    setShow(true);
    setFetchAllDataAgain(false);
  }  
  const handleOnClickDelete = ()=>{
    setType('delete');
    setShow(true);
    setFetchAllDataAgain(false);
  }

  return (
    <tr key={index}>
        <AddStudent student={student} type={type} show={show} setShow={setShow} setFetchAllDataAgain={setFetchAllDataAgain}/>
      <td>{index}</td>
      <td>{student.name}</td>
      <td>{student.course}</td>
      <td>{student.qualification}</td>
      <td>{student.startDate}</td>
      <td>{student.endDate}</td>
      <td>{student.feeStatus}</td>
      <td>
        <Button variant="success" size="sm" className="button__size" onClick={handleOnClickUpdate}>
          Update
        </Button>
        <Button variant="danger" size="sm" className="button__size" onClick={handleOnClickDelete}>
          Delete
        </Button>
      </td>
    </tr>
  );
};
