import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import { useEffect } from "react";
import {
  getOneModalAllDocuments,
  updateData,
} from "../../../actions/homeActions";
import { AssignedCoursesModalPresentational } from "./AssignedCoursesModalPresentational";

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
    <AssignedCoursesModalPresentational
      individualTutor={individualTutor}
      handleClose={handleClose}
      assignedCourses={assignedCourses}
      addCourse={addCourse}
      handleOnAddAssignedCourses={handleOnAddAssignedCourses}
      handleOnAddCourse={handleOnAddCourse}
      onHandleCourseDelete={onHandleCourseDelete}
      handleOnSalaryHistory={handleOnSalaryHistory}
      showAddCourse={showAddCourse}
      startDate={startDate}
      endDate={endDate}
      theSelectedShift={theSelectedShift}
      theSelectedShiftId={theSelectedShiftId}
      salary={salary}
      allCourses={allCourses}
      theSelectedCourse={theSelectedCourse}
      theSelectedCourseId={theSelectedCourseId}
      allShifts={allShifts}
      hideAddCourse={hideAddCourse}
    ></AssignedCoursesModalPresentational>
  );
};
