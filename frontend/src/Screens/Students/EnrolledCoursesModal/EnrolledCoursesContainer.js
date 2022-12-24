import React, { useState } from "react";
import { useEffect } from "react";

import {
  deleteData,
  getOneModalAllDocuments,
  getOneModalDocumentsById,
  insertData,
  updateData,
} from "../../../actions/homeActions";
import { datesList, monthsList, yearsList } from "../../../Data/StudentsData";
import { EnrolledCoursesPresentataional } from "./EnrolledCoursesPresentational";
import "../../../styles/screens/home.css";
import EnrolledCourse from "../../../classes/EnrolledCourses.class";
export const EnrolledCoursesModalContainer = ({
  show,
  setShow,
  individualStudent,
  setRefresh,
}) => {
  // data
  const enrolledCourse = {};
  // USESTATES
  const [allCourses, setAllCourses] = useState();
  const [allShifts, setAllShifts] = useState();
  const [addCourse, setAddCourse] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // USE EFFECTS
  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "courses",
    })
      .then((result) => {
        const list = result.map((course, index) => {
          const obj = {
            _id: course._id,
            label: course.courseName,
            value: course.courseName,
          };
          return obj;
        });
        setAllCourses(list);
        console.log(list);
      })
      .catch((e) => console.log(e));

    // for fetching shifts
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "shifts",
    })
      .then((result) => {
        const list = result.map((shift, index) => {
          const obj = {
            _id: shift._id,
            label: shift.name,
            value: shift.name,
          };
          return obj;
        });
        setAllShifts(list);
      })
      .catch((e) => console.log(e));

    // for fetching enrolled courses
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "enrolledCourses",
      filter: { studentId: individualStudent._id },
    })
      .then((result) => {
        const list = result.map((course, index) => {
          const obj = new EnrolledCourse({
            id: course._id,
            courseId: course.courseId,
            courseName: course.courseName,
            year: course.year,
            month: course.month,
            startDate: course.startDate,
            endDate: course.endDate,
            shiftId: course.shiftId,
            shift: course.shift,
            paymentStatus: course.paymentStatus,
            actualCoursePrice: course.actualCoursePrice,
            studentId: course.studentId,
          });
          return obj;
        });
        console.log("The list of courses: ", list[0]);
        setEnrolledCourses(list);
      })
      .catch((e) => console.log(e));
  }, []);

  // functions
  const handleClose = () => {
    setShow(false);
  };

  const showAddCourse = () => {
    setAddCourse(true);
  };

  const hideAddCourse = () => {
    setAddCourse(false);
  };
  const handleOnAddCourse = () => {
    enrolledCourse.paymentStatus = "not paid";
    if (
      enrolledCourse.courseId &&
      enrolledCourse.courseName &&
      enrolledCourse.month &&
      enrolledCourse.year &&
      enrolledCourse.startDate &&
      enrolledCourse.endDate &&
      enrolledCourse.shift &&
      enrolledCourse.shiftId &&
      enrolledCourse.actualCoursePrice
    ) {
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "enrolledCourses",
        doc: enrolledCourse,
      }).then((result) => {
        const enrolledCourseObject = new EnrolledCourse({
          id: result.insertedId,
          courseId: enrolledCourse.courseId,
          courseName: enrolledCourse.courseName,
          year: enrolledCourse.year,
          month: enrolledCourse.month,
          startDate: enrolledCourse.startDate,
          endDate: enrolledCourse.endDate,
          shiftId: enrolledCourse.shiftId,
          shift: enrolledCourse.shift,
          paymentStatus: enrolledCourse.paymentStatus,
          actualCoursePrice: enrolledCourse.actualCoursePrice,
          studentId: individualStudent._id,
        });
        console.log("studentId: " + individualStudent);
        console.log("studentId: " + individualStudent._id);
        setEnrolledCourses((prevState) => {
          return [...prevState, enrolledCourseObject];
        });
        setAddCourse(false);
      });
    }
  };

  const handleOnDeleteCourse = (id) => {
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=enrolledCourses`,
    })
      .then((result) => {
        setEnrolledCourses((prevState) => {
          return prevState.filter((course) => {
            return course.enrolledCourseId !== id;
          });
        });
        hideAddCourse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnUpdateCourse = (enrolledCourse, paymentStatus) => {
    const enrolledCourseObject = new EnrolledCourse({
      id: enrolledCourse.id,
      courseId: enrolledCourse.courseId,
      courseName: enrolledCourse.courseName,
      year: enrolledCourse.year,
      month: enrolledCourse.month,
      startDate: enrolledCourse.startDate,
      endDate: enrolledCourse.endDate,
      shiftId: enrolledCourse.shiftId,
      shift: enrolledCourse.shift,
      paymentStatus: paymentStatus,
      studentId: enrolledCourse.studentId,
    });
    updateData({
      url: "/api/commonRoute/updateData",
      collectionName: "enrolledCourses",
      updatedTo: enrolledCourseObject,
      id: enrolledCourse.id,
    })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <EnrolledCoursesPresentataional
      show={show}
      setShow={setShow}
      individualStudent={individualStudent}
      setRefresh={setRefresh}
      handleClose={handleClose}
      showAddCourse={showAddCourse}
      addCourse={addCourse}
      yearsList={yearsList}
      monthsList={monthsList}
      datesList={datesList}
      hideAddCourse={hideAddCourse}
      allCourses={allCourses}
      allShifts={allShifts}
      enrolledCourse={enrolledCourse}
      handleOnAddCourse={handleOnAddCourse}
      enrolledCourses={enrolledCourses}
      handleOnDeleteCourse={handleOnDeleteCourse}
      handleOnUpdateCourse={handleOnUpdateCourse}
      showPaymentModal={showPaymentModal}
      setShowPaymentModal={setShowPaymentModal}
    ></EnrolledCoursesPresentataional>
  );
};
