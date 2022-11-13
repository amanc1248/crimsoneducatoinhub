import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { useEffect } from "react";
import { getOneModalAllDocuments, updateData } from "../../actions/homeActions";
import { SalaryHistoryModal } from "./SalaryHistoryModal.js";

export const AssignedCoursesModal = ({
  show,
  setShow,
  individualTutor,
  setRefresh,
}) => {
  // data
  let theSelectedCourseId = "";
  let theSelectedCourse = "";
  let startDate = "";
  let endDate = "";

  let theSelectedShift = "";
  let theSelectedShiftId = "";
  let salary = "";

  // usestates
  const [addCourse, setAddCourse] = useState(false);
  const [assignedCourses, setAssignedCourses] = useState(
    individualTutor?.assignedCourses ? individualTutor.assignedCourses : []
  );

  const [assignedShifts, setAssignedShifts] = useState(
    individualTutor?.assignedShifts ? individualTutor.assignedShifts : []
  );
  const [allCourses, setAllCourses] = useState();
  const [originalCourses, setOriginalCourse] = useState();

  const [allShifts, setAllShifts] = useState();
  const [originalShifts, setOriginalShift] = useState();

  const [showSalaryHistoryModal, setSalaryHistoryModal] = useState(false);

  // use effects
  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "courses",
    })
      .then((result) => {
        console.log("all documents: ", result);
        filteringCourses(assignedCourses, result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "shifts",
    })
      .then((result) => {
        console.log("all documents: ", result);
        filteringShifts(assignedShifts, result);
      })
      .catch((e) => console.log(e));
  }, []);

  // functions
  const handleClose = () => {
    setShow(false);
  };
  const onHandleCourseDelete = (id) => {
    setAssignedCourses((prevState) => {
      return [...prevState.filter((d) => id !== d._id)];
    });
  };

  const showAddCourse = () => {
    setAddCourse(true);
  };

  const hideAddCourse = () => {
    setAddCourse(false);
  };

  const handleOnAddCourse = () => {
    if (
      theSelectedCourseId &&
      theSelectedCourse &&
      startDate &&
      endDate &&
      theSelectedShift &&
      salary
    ) {
      const obj = {
        _id: theSelectedCourseId,
        courseName: theSelectedCourse,
        startDate: startDate,
        endDate: endDate,
        shift: theSelectedShift,
        shift_id: theSelectedShiftId,
        salary: salary,
      };
      var allowSetAssignedCourse = true;
      assignedCourses.map((course) => {
        if (theSelectedCourseId === course._id) {
          allowSetAssignedCourse = false;
          return alert("Already assigned, delete the course and then add it");
        }
      });
      if (allowSetAssignedCourse === true) {
        console.log("THe object: ", obj);
        setAssignedCourses((prevState) => {
          return [...prevState, obj];
        });
        setAddCourse(false);
      }
    }
  };

  const filteringCourses = (assignedCourses, allCourses) => {
    var courseList = [];
    var originalList = [];
    for (let index = 0; index < allCourses.length; index++) {
      const element = allCourses[index];
      originalList.push({
        _id: element._id,
        label: element.courseName,
        value: element.courseName,
      });
      let itConsist = false;
      for (let j = 0; j < assignedCourses.length; j++) {
        const aC = assignedCourses[j];
        if (element._id === aC._id) {
          itConsist = true;
          break;
        }
      }
      if (itConsist === false) {
        const obj = {
          _id: element._id,
          label: element.courseName,
          value: element.courseName,
        };
        courseList.push(obj);
      }
    }
    setOriginalCourse(originalList);
    setAllCourses(originalList);
  };

  const filteringShifts = (assignedShifts, allShifts) => {
    var shiftList = [];
    var originalList = [];
    for (let index = 0; index < allShifts.length; index++) {
      const element = allShifts[index];
      originalList.push({
        _id: element._id,
        label: element.shiftName,
        value: element.shiftName,
      });
      let itConsist = false;
      for (let j = 0; j < assignedShifts.length; j++) {
        const aC = assignedShifts[j];
        if (element._id === aC._id) {
          itConsist = true;
          break;
        }
      }
      if (itConsist === false) {
        const obj = {
          _id: element._id,
          label: element.shiftName,
          value: element.shiftName,
        };
        shiftList.push(obj);
      }
    }
    setOriginalShift(originalList);
    setAllShifts(originalList);
  };

  const handleOnAddAssignedCourses = (id) => {
    const theDoc = { assignedCourses: assignedCourses };
    updateData({
      url: "/api/commonRoute/updateData",
      collectionName: "tutors",
      updatedTo: theDoc,
      id: id,
    })
      .then((result) => {
        setRefresh(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnSalaryHistory = () => {
    setSalaryHistoryModal(true);
  };

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
        {showSalaryHistoryModal && (
          <SalaryHistoryModal
            setShow={setSalaryHistoryModal}
            // tutors={tutors}
            // setTutors={setTutors}
            courseModalType="Add"
            setRefresh={setRefresh}
          />
        )}

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
