import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";

import "../../styles/screens/home.css";
import { SearchComponentC } from "../../components/SearchComponent/SearchComponent.c";
import { IndividualCourseContainer } from "./IndividualCourse/IndividualCourse.c";
import { CourseModalContainer } from "./CoursesModal/CourseModal.c";
import { Loader } from "../../components/Loader";
import { TailSpin } from "react-loader-spinner";

export const CoursesPresentational = ({
  showModal,
  setShowModal,
  courses,
  setCourses,
  setRefresh,
  unModifiableOrignalList,
  currentPage,
  totalPages,
  setCurrentPage,
  loader
}) => {
  return (
    <div className="courses">
      {/* course modal */}
      {showModal && (
        <CourseModalContainer
          setShow={setShowModal}
          courses={courses}
          setCourses={setCourses}
          courseModalType="Add"
          setRefresh={setRefresh}
        />
      )}

      {/* action buttons */}
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Course
        </Button>
        {courses && (
          <SearchComponentC
            originalList={unModifiableOrignalList}
            setOriginalList={setCourses}
          ></SearchComponentC>
        )}
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          activePage={currentPage}
          itemsCountPerPage={100}
          totalItemsCount={totalPages}
          pageRangeDisplayed={3}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <br />
      {loader ? <Loader></Loader> :  <div className="students__inside">
        <Table striped hover size="sm" className="table__list" responsive>
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
            {courses.map((course, index) => {
              return (
                <IndividualCourseContainer
                  course={course}
                  index={index}
                  key={index}
                  setRefresh={setRefresh}
                />
              );
            })}
          </tbody>
        </Table>
      </div>}
    </div>
  );
};
