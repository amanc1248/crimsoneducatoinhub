import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import "../../styles/screens/home.css";
import { Pagination } from "../../components/Pagination";
import { AddCourses } from "./AddCourses";
import { getAllData } from "../../actions/homeActions";

export const CoursesContainer = () => {
  const [courses, setCourses] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllData({ url: "/api/commonRoute/getData", collectionName: "courses" })
      .then((result) => {
        setCourses(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="courses">
      <AddCourses
        show={show}
        setShow={setShow}
        courses={courses}
        setCourses={setCourses}
      />
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShow(true);
          }}
        >
          Add Courses
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
              <th>Course Name</th>
              <th>Time</th>
              <th>Fee</th>
              <th>Course Details</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, index) => {
                return (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{course.courseName}</td>
                    <td>{course.time}</td>

                    <td>{course.fee}</td>

                    <td style={{ width: "300px", textAlign: "left" }}>
                      {" "}
                      {course.courseDetails}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
