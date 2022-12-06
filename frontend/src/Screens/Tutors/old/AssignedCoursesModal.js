import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { useEffect } from "react";
<<<<<<<< HEAD:frontend/src/Screens/Tutors/AssignedCoursesModal/AssignedCoursesModalPresentational.js
import { getOneModalAllDocuments, updateData } from "../../../actions/homeActions";
========
import {
  getOneModalAllDocuments,
  updateData,
} from "../../../actions/homeActions";
import { SalaryHistoryModal } from "../SalaryHistoryModal.js";
>>>>>>>> origin/development_gaurab_4:frontend/src/Screens/Tutors/old/AssignedCoursesModal.js

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
  // data
  let theSelectedCourseId = "";
  let theSelectedCourse = "";
  let startDate = "";
  let endDate = "";

  let theSelectedShift = "";
  let theSelectedShiftId = "";
  let salary = "";
  let year = "";

  const yearList = [
    { label: "2001", value: "2001" },
    { label: "2002", value: "2002" },
    { label: "2003", value: "2003" },
    { label: "2004", value: "2004" },
    { label: "2005", value: "2005" },
    { label: "2006", value: "2006" },
    { label: "2007", value: "2007" },
    { label: "2008", value: "2008" },
    { label: "2009", value: "2009" },
    { label: "2010", value: "2010" },
    { label: "2011", value: "2011" },
    { label: "2012", value: "2012" },
    { label: "2013", value: "2013" },
    { label: "2014", value: "2014" },
    { label: "2015", value: "2015" },
    { label: "2016", value: "2016" },
    { label: "2017", value: "2017" },
    { label: "2018", value: "2018" },
    { label: "2019", value: "2019" },
    { label: "2020", value: "2020" },
    { label: "2021", value: "2021" },
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "2030", value: "2030" },
    { label: "2031", value: "2031" },
    { label: "2032", value: "2032" },
    { label: "2033", value: "2033" },
    { label: "2034", value: "2034" },
    { label: "2035", value: "2035" },
    { label: "2036", value: "2036" },
    { label: "2037", value: "2037" },
    { label: "2038", value: "2038" },
    { label: "2039", value: "2039" },
    { label: "2040", value: "2040" },
    { label: "2041", value: "2041" },
    { label: "2042", value: "2042" },
    { label: "2043", value: "2043" },
    { label: "2044", value: "2044" },
    { label: "2045", value: "2045" },
    { label: "2046", value: "2046" },
    { label: "2047", value: "2047" },
    { label: "2048", value: "2048" },
    { label: "2049", value: "2049" },
    { label: "2050", value: "2050" },
  ];

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

                <div>
                  <label for="year">Year</label>
                  <Select
                    placeholder="Select Year"
                    className="selecting__divs"
                    options={yearList}
                    onChange={(e) => {
                      year = e.label;
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
