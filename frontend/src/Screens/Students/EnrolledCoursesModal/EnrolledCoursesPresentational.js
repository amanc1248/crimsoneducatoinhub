import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { IndividualEnrolledCourseC } from "./IndividualEnrolledCourse/IndividualEnrolledCourse.c";

export const EnrolledCoursesPresentataional = ({
  setShow,
  individualStudent,
  handleClose,
  showAddCourse,
  addCourse,
  yearsList,
  monthsList,
  datesList,
  hideAddCourse,
  allCourses,
  allShifts,
  enrolledCourse,
  handleOnAddCourse,
  enrolledCourses,
  handleOnDeleteCourse
}) => {
  return (
    <>
      {/* <PaymentModalC></PaymentModalC> */}
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Enrolled Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover size="sm" className="table__list">
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Year</th>
                <th>Month</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Shift</th>
                <th>Actual Price</th>
                <th>Paid Amount</th>
                <th>Remaining Amount</th>
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enrolledCourses &&
                enrolledCourses.map((course, index) => {
                  return (
                    <IndividualEnrolledCourseC
                    key={course.id}
                    course={course}
                    index={index}
                    handleOnDeleteCourse={handleOnDeleteCourse}
                    ></IndividualEnrolledCourseC>
                  );
                })}
            </tbody>
          </Table>
          <Button
            variant="success"
            size="sm"
            className="add__button__size"
            onClick={showAddCourse}
          >
            + Add Course
          </Button>
          {addCourse && (
            <div>
              <div className="adding__course__div">
                {/* 1. selecting course */}
                <div>
                  <label htmlFor="">Select a course</label>
                  <Select
                    placeholder="course"
                    className="selecting__divs"
                    options={allCourses}
                    onChange={(e) => {
                      enrolledCourse.courseId = e._id;
                      enrolledCourse.courseName = e.value;
                      enrolledCourse.studentId =individualStudent._id
                    }}
                  />
                </div>

                {/* select year */}
                <div>
                  <label htmlFor="">Select an year</label>
                  <Select
                    placeholder="year"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      enrolledCourse.year = e.value;
                    }}
                  />
                </div>

                {/* select month */}
                <div>
                  <label htmlFor="">Select a month</label>
                  <Select
                    placeholder="month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      enrolledCourse.month = e.value;
                    }}
                  />
                </div>

                {/* select start date */}
                <div>
                  <label htmlFor="">Select start date</label>
                  <Select
                    placeholder="startDate"
                    className="selecting__divs"
                    options={datesList}
                    onChange={(e) => {
                      enrolledCourse.startDate = e.value;
                    }}
                  />
                </div>

                {/* select end date */}
                <div>
                  <label htmlFor="">Select end date</label>
                  <Select
                    placeholder="endDate"
                    className="selecting__divs"
                    options={datesList}
                    onChange={(e) => {
                      enrolledCourse.endDate = e.value;
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="">Select a shift</label>
                  <Select
                    placeholder="Shift"
                    className="selecting__divs"
                    options={allShifts}
                    onChange={(e) => {
                      enrolledCourse.shift = e.value;
                      enrolledCourse.shiftId = e._id;
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="">Enter actual course price</label>
                  <input
                    type="number"
                    className="selecting__divs"
                    placeHolder="price"
                    onChange={(e) => {
                      enrolledCourse.actualCoursePrice = e.target.value;
                    }}
                  />
                </div>
              </div>

              <Button
                variant="btn-close"
                size="sm"
                className="add__button__size"
                onClick={hideAddCourse}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="add__button__size"
                onClick={handleOnAddCourse}
              >
                Save
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-close" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShow(false);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
