import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../../styles/screens/home.css";
import { Pagination } from "../../components/Pagination";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { CourseModal } from "./CourseModal";
import { IndividualCourse } from "./IndividualCourse";

export const CoursesContainer = () => {

  // use states
  const [courses, setCourses]                    = useState();
  const [showModal, setShowModal]                = useState(false);
  const [refresh, setRefresh]                    = useState(true);
  const [totalPages, setTotalPages]              = useState();
  const  [currentPage, setCurrentPage]           = useState(1);

  // use effect
  useEffect(()=>{
    getOneModalTotalCount({url:"/api/commonRoute/getOneModalTotalCount", collectionName:"courses"}).then((result)=>{
      console.log("total documents: ", result)
      setTotalPages(Math.floor(result/3)+1)
    }).catch((e)=>console.log(e));
  },[])

  useEffect(() => {
    refresh && getAllData({ url: "/api/commonRoute/getData", collectionName: "courses", pageNumber:currentPage,nPerPage:3 })
      .then((result) => {
        setCourses(result);
        setRefresh(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  useEffect(() => {
    getAllData({ url: "/api/commonRoute/getData", collectionName: "courses", pageNumber:currentPage, nPerPage:3  })
      .then((result) => {
        setCourses(result);
        setRefresh(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  return (
    <div className="courses">

      {/* course modal */}
      {showModal && <CourseModal
        setShow={setShowModal}
        courses={courses}
        setCourses={setCourses}
        courseModalType="Add"
        setRefresh={setRefresh}
      />}

      {/* action buttons */}
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Courses
        </Button>
        <Pagination
          totalPages={totalPages}
          nextButtonName="Next"
          prevButtonName="Prev"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <br />
      <div className="students__inside">
        <Table striped hover size="sm" className="table__list">
          <thead>
            <tr>
              <th>#</th>
              <th>Course Name</th>
              <th>Time (Months)</th>
              <th>Fee (Rs.)</th>
              <th>Course Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses &&
              courses.map((course, index) => {
                return (
                  <IndividualCourse course={course} index={index} key={index} setRefresh={setRefresh} />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
