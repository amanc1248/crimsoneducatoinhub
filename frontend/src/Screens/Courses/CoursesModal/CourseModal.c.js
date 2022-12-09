import React, {useState } from "react";
import { deleteData, insertData, updateData } from "../../../actions/homeActions";
import { CourseModalPresentational } from "./CourseModa.p";

export function CourseModalContainer({individualCourse, courseModalType, setRefresh, setShow }) {

  // USESTATES
  const [course, setCourse] = useState({
    courseName: individualCourse && individualCourse.courseName,
    courseDuration: individualCourse && individualCourse.courseDuration,
    courseFee:individualCourse && individualCourse.courseFee,
    courseDetails: individualCourse && individualCourse.courseDetails,
    date:""
  })
  // functions
  // 1. on adding course
  const handleOnClickSubmit = async() => { 
    await setCourse((prevState) => {
      return {
        ...prevState,
        date: new Date(),
      };
    });
    console.log("Course: ", course);
    if (course.courseName && course.courseDuration && course.courseFee && course.courseDetails) {
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "courses",
        doc:course,
      })
        .then((result) => {
          setRefresh(true);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 2. closing course modal
  const handleClose = () => {
    setCourse({
      courseName: "",
      courseDuration: "",
      courseFee: "",
      courseDetails: "",
      date: "",
    });
    setShow(false)
  };

  // 3. on updating course
  const handleOnClickUpdate = ()=>{
    if (course.courseName && course.courseDuration && course.courseFee && course.courseDetails) {
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "courses",
        updatedTo:course,
        id:individualCourse.courseId
      })
        .then((result) => {
          setRefresh(true);
          // setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // 4. on deleting course
  const handleOnClickDelete = ()=>{
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualCourse.courseId}&collectionName=courses`,
    })
      .then((result) => {
        setRefresh(true);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  console.log("Individual course", individualCourse)
  return (
    <CourseModalPresentational
    courseModalType={courseModalType}
    handleClose={handleClose}
    course={course}
    setCourse={setCourse}
    handleOnClickSubmit={handleOnClickSubmit}
    handleOnClickUpdate={handleOnClickUpdate}
    handleOnClickDelete={handleOnClickDelete}
    ></CourseModalPresentational>
  );
}
