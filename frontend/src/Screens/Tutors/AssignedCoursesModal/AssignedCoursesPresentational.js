import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { IndividualAssignedCourseC } from "./IndividualAssignedCourse/IndividualAssignedCourse.c";

export const AssignedCoursesPresentational = ({
  setShow,
  individualTutor,
  handleClose,
  showAddCourse,
  addCourse,
  yearsList,
  monthsList,
  datesList,
  hideAddCourse,
  allCourses,
  allShifts,
  assignedCourse,
  assignedCourses,
  handleOnAddCourse,
  onHandleCourseDelete
}) => {
  return (
    <>
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
          <Modal.Title>
            {individualTutor.name + " Assigned Courses"}
          </Modal.Title>
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
                <th>Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedCourses &&
                assignedCourses.map((course, index) => {
                  return (
                    <IndividualAssignedCourseC
                      key={course.assignedCourseId}
                      course={course}
                      index={index}
                      onHandleCourseDelete={onHandleCourseDelete}
                    ></IndividualAssignedCourseC>
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
                      assignedCourse.courseId = e._id;
                      assignedCourse.courseName = e.value;
                      assignedCourse.tutorId = individualTutor._id;
                    }}
                  />
                </div>

                <div>
                  <label for="year">Year</label>
                  <Select
                    placeholder="Select Year"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      // year = e.label;
                      assignedCourse.year = e.value;
                    }}
                  />
                </div>

                {/* 2. Start Date  */}
                <div class="learning__form__group ">
                  <label for="month">Month</label>
                  <Select
                    placeholder="Select month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      // year = e.label;
                      assignedCourse.month = e.value;
                    }}
                  />
                </div>

                {/* 3. End Date  */}
                <div class="learning__form__group ">
                  <label htmlFor="">Select start date</label>
                  <Select
                    placeholder="startDate"
                    className="selecting__divs"
                    options={datesList}
                    onChange={(e) => {
                      assignedCourse.startDate = e.value;
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
                      assignedCourse.endDate = e.value;
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
                      assignedCourse.shift = e.value;
                      assignedCourse.shiftId = e._id;
                    }}
                  />
                </div>

                <div>
                  <label for="salary">Salary</label>
                  <input
                    class="form-control"
                    id="salary"
                    name="salary"
                    placeholder="Enter Amount"
                    onChange={(e) => {
                      assignedCourse.salary = e.target.value;
                    }}
                    type="number"
                  ></input>
                </div>
              </div>

              <div className="adding__course__div"></div>
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
