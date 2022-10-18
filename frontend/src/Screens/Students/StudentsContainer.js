import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import "../../styles/screens/home.css"
import { Pagination } from "../../components/Pagination";
import { AddStudent } from "./AddStudent";
import { getAllData } from "../../actions/homeActions";

export const StudentsContainer = () => {

  // data

  // use states
  const [students, setStudents] = useState();
  const [show, setShow] = useState(false);




  useEffect(() => {
    getAllData({url:"/api/commonRoute/getData", collectionName:"students"}).then((result)=>{
      setStudents(result)
    }).catch((e)=>{console.log(e)})
  }, []);

  return (
    <div className="students">
      <AddStudent
        show={show}
        setShow={setShow}
        students={students}
        setStudents ={setStudents}
      />
      <div className="action__buttons">
        <Button variant="primary" size="sm" onClick={()=>{setShow(true)}}>
          Add Student
        </Button>
        <Pagination
          totalPages={3}
          nextButtonName="Next"
          prevButtonName="Prev"
          currentPage={1}
          // setCurrentPage=
        />
      </div>
      <br />
      <div className="students__inside">
        <Table striped hover size="sm" className="table__list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Course</th>
              <th>Qualification</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Fee Status</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{student.name}</td>
                    <td>{student.course}</td>
                    <td>{student.qualification}</td>
                    <td>{student.startDate}</td>
                    <td>{student.endDate}</td>
                    <td>{student.feeStatus}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

