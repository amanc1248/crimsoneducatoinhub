import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../../styles/screens/home.css";
import { Pagination } from "../../components/Pagination";
import { getAllData } from "../../actions/homeActions";
import { CourseModal } from "./CourseModal";
import { IndividualCourse } from "./IndividualCourse";

export const CoursesContainer = () => {

  // use states
  const [courses, setCourses]                    = useState();
  const [show, setShow]                          = useState(false);

  // use effect
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

      {/* course modal */}
      <CourseModal
        show={show}
        setShow={setShow}
        courses={courses}
        setCourses={setCourses}
      />

      {/* action buttons */}
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, index) => {
                return (
                  <IndividualCourse course={course} index={index} key={index} />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
