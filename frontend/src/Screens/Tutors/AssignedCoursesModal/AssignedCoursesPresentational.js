import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { IndividualAssignedCourseC } from "./IndividualAssignedCourse/IndividualAssignedCourse.c";
import { Loader } from "../../../components/Loader";

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
  onHandleCourseDelete,
  loading,
  deleteLoading,
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
              {assignedCourses &&
                assignedCourses.map((course, index) => {
                  return (
                    <IndividualAssignedCourseC
                      key={course.assignedCourseId}
                      course={course}
                      index={index}
                      onHandleCourseDelete={onHandleCourseDelete}
                      loading={loading}
                      deleteLoading={deleteLoading}
                      individualTutor={individualTutor}
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

          {/* For assigning the course to tutor */}
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
                      assignedCourse.startYear = e.value;
                    }}
                  />
                </div>

                {/* 2. Start Month  */}
                <div class="learning__form__group ">
                  <label for="month">Start Month</label>
                  <Select
                    placeholder="Select month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      // year = e.label;
                      assignedCourse.startMonth = e.value;
                    }}
                  />
                </div>

                {/* 3. Start Date  */}
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
                <br />
              </div>

              <div className="adding__course__div">
                {/* selecting end year */}
                <div>
                  <label htmlFor="">Select end date</label>
                  <Select
                    placeholder="endYear"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      assignedCourse.endYear = e.value;
                    }}
                  />
                </div>
                {/* end month */}
                <div>
                  <label htmlFor="">Select End Month</label>
                  <Select
                    placeholder="endMonth"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      assignedCourse.endMonth = e.value;
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
              </div>

              {/* for saving or canceling the assigned course  */}
              <div className="adding__course__div">
                <div>
                  <label for="salary">Salary</label>
                  <input
                    class="form-control input__div"
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
              {loading ? <Loader></Loader> : <div>
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
              </div>}
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
