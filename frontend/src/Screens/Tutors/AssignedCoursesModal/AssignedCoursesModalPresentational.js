import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { useEffect } from "react";
import { getOneModalAllDocuments, updateData } from "../../../actions/homeActions";

export const AssignedCoursesModalPresentational = ({
  individualTutor,
  handleClose,
  assignedCourses,
  addCourse,
  handleOnAddAssignedCourses,
  handleOnAddCourse,
  onHandleCourseDelete,
  handleOnSalaryHistory,
  showAddCourse,
  allCourses,
  theSelectedCourse,
  theSelectedCourseId,
  allShifts,
  hideAddCourse,
  startDate,
  endDate,
  theSelectedShift,
  theSelectedShiftId,
  salary
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
        {/* {showSalaryHistoryModal && (
          <SalaryHistoryModal
            setShow={setSalaryHistoryModal}
            // tutors={tutors}
            // setTutors={setTutors}
            // courseModalType="Add"
            setRefresh={setRefresh}
          />
        )} */}

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
                <th>Start Date</th>
                <th>End Date</th>
                <th>Salary</th>
                <th>Shift</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedCourses &&
                assignedCourses.map((course, index) => {
                  return (
                    <tr key={course._id}>
                      <td>{index + 1}</td>
                      <td>{course.courseName}</td>
                      <td>{course.startDate}</td>
                      <td>{course.endDate}</td>
                      <td>{course.salary}</td>
                      <td>{course.shift}</td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          className="button__size"
                          onClick={() => {
                            onHandleCourseDelete(course._id);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="info"
                          size="sm"
                          className="button__size ml-4"
                          onClick={handleOnSalaryHistory}
                        >
                          Salary History
                        </Button>
                      </td>
                    </tr>
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
                      theSelectedCourse = e.label;
                      theSelectedCourseId = e._id;
                    }}
                  />
                </div>

                {/* 2. Start Date  */}
                <div class="learning__form__group ">
                  <label for="startDate">Start Date</label>
                  <input
                    type="date"
                    class="form-control selecting__divs"
                    id="startDate"
                    name="startDate"
                    rows="4"
                    cols="50"
                    placeholder="Select starting date"
                    onChange={(e) => {
                      startDate = e.target.value;
                    }}
                  ></input>
                </div>

                {/* 3. End Date  */}
                <div class="learning__form__group ">
                  <label for="endDate">End Date</label>
                  <input
                    type="date"
                    class="form-control selecting__divs"
                    id="endDate"
                    name="endDate"
                    rows="4"
                    cols="50"
                    placeholder="Select starting date"
                    onChange={(e) => {
                      endDate = e.target.value;
                    }}
                  ></input>
                </div>
              </div>

              <div className="adding__course__div">
                <div>
                  <label htmlFor="">Select a shift</label>
                  <Select
                    placeholder="Shift"
                    className="selecting__divs"
                    options={allShifts}
                    onChange={(e) => {
                      theSelectedShift = e.label;
                      theSelectedShiftId = e._id;
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
                      salary = e.target.value;
                    }}
                    type="number"
                  ></input>
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
              handleOnAddAssignedCourses(individualTutor._id);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
