import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { IndividualEnrolledCourseC } from "./IndividualEnrolledCourse/IndividualEnrolledCourse.c";
import { Loader } from "../../../components/Loader";

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
  handleOnDeleteCourse,
  loading,
  handleOnChangeTutor,
  handleCourseChange,
  allTutors,
  tutorLoading,
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
          <Table striped hover size="sm" className="table__list" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Course Name</th>
                <th>Start Year</th>
                <th>Start Month</th>
                <th>Start Date</th>
                <th>End Year</th>
                <th>End Month</th>
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
                      student={individualStudent}
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
                  <label htmlFor="">Select course</label>
                  <Select
                    placeholder="course"
                    className="selecting__divs"
                    options={allCourses}
                    onChange={(e) => {
                      handleCourseChange(e);
                    }}
                  />
                </div>

                {tutorLoading ? "Loading": <div>
                  <label htmlFor="">Select a tutor</label>
                  <Select
                    placeholder="Tutors"
                    className="selecting__divs"
                    options={allTutors}
                    onChange={(e) => {
                      enrolledCourse.tutorId = e._id;
                      enrolledCourse.tutorName = e.value;
                      enrolledCourse.assignedCourseId = e.assignedCourseId;
                      handleOnChangeTutor(e._id);
                    }}
                  />
                </div>}

                <div>
                  <label htmlFor="">Select a shift of the tutor</label>
                  <Select
                    placeholder="Shift"
                    className="selecting__divs"
                    options={allShifts}
                    onChange={(e) => {
                      enrolledCourse.shiftId = e._id;
                      enrolledCourse.shift = e.value;
                    }}
                  />
                </div>
              </div>
              <div className="adding__course__div">
                {/* select year */}
                <div>
                  <label htmlFor="">Select start year</label>
                  <Select
                    placeholder="year"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      enrolledCourse.startYear = e.value;
                    }}
                  />
                </div>

                {/* select month */}
                <div>
                  <label htmlFor="">Select start month</label>
                  <Select
                    placeholder="month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      enrolledCourse.startMonth = e.value;
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
              </div>
              <div className="adding__course__div">
                {/* select year */}
                <div>
                  <label htmlFor="">Select end year</label>
                  <Select
                    placeholder="year"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      enrolledCourse.endYear = e.value;
                    }}
                  />
                </div>

                {/* select month */}
                <div>
                  <label htmlFor="">Select end month</label>
                  <Select
                    placeholder="month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      enrolledCourse.endMonth = e.value;
                    }}
                  />
                </div>

                {/* select start date */}
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
              </div>
              <div className="adding__course__div">
                <div>
                  <label htmlFor="">Enter actual course price</label>
                  <input
                    type="number"
                    className="form-control input__div"
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
          {loading ? (
            <Loader></Loader>
          ) : (
            <div>
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
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};
