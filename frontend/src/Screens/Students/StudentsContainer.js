import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../../styles/screens/home.css";
import { Pagination } from "../../components/Pagination";
import { AddStudent } from "./AddStudent";
import { getAllData } from "../../actions/homeActions";
import { IndividualStudent } from "./IndividualStudent";

export const StudentsContainer = () => {
  // data

  // use states
  const [students, setStudents]                   = useState();
  const [show, setShow]                           = useState(false);
  const [fetchAllDataAgain, setFetchAllDataAgain] = useState(false);
  const [studentModalType, setStudentModalType] = useState()

  // USE EFFECTS
  useEffect(() => {
    getAllData({ url: "/api/commonRoute/getData", collectionName: "students" })
      .then((result) => {
        setStudents(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [fetchAllDataAgain]);

  return (
    <div className="students">
      <AddStudent
        shouldShow={show}
        setShouldShow={setShow}
        setFetchAllDataAgain={setFetchAllDataAgain}
        type={studentModalType}
      />
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShow(true);
            setFetchAllDataAgain(false)
            setStudentModalType('add')
          }}
        >
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
              <th>Email</th>
              <th>Course</th>
              <th>Qualification</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Fee Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students &&
              students.map((student, index) => {
                return (
                  <IndividualStudent
                    student={student}
                    index={index}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
