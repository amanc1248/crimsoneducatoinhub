import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../../styles/screens/home.css";
import { Pagination } from "../../components/Pagination";
import { AddTutor } from "./AddTutor";
import { getAllData } from "../../actions/homeActions";

export const TutorsContainer = () => {
  const [tutors, setTutors] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllData({ url: "/api/commonRoute/getData", collectionName: "tutors" })
      .then((result) => {
        setTutors(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="tutors">
      <AddTutor
        show={show}
        setShow={setShow}
        tutors={tutors}
        setTutors={setTutors}
      />
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShow(true);
          }}
        >
          Add Tutor
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
              <th>Courses</th>
              <th>Age</th>
              <th>Qualification</th>
              <th>Start Date</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {tutors &&
              tutors.map((tutor, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{tutor.name}</td>
                    <td>{tutor.email}</td>
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
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
