import React, { useState } from "react";
import { toast } from "react-toastify";
import {
  deleteData,
  insertData,
  updateData,
} from "../../../actions/homeActions";
import { CourseModalPresentational } from "./CourseModa.p";

export function CourseModalContainer({
  individualCourse,
  courseModalType,
  setRefresh,
  setShow,
}) {
  const classTypeList = [
    { label: "Normal Class", value: "normal" },
    { label: "Special Class", value: "special" },
  ];
  // USESTATES
  const [course, setCourse] = useState({
    courseName: individualCourse && individualCourse.courseName,
    courseDuration: individualCourse && individualCourse.courseDuration,
    courseFee: individualCourse && individualCourse.courseFee,
    courseDetails: individualCourse && individualCourse.courseDetails,
    classType: individualCourse && individualCourse.classType,
    date: "",
  });
  const [loader, setLoader] = useState(false);
  // functions
  // 1. on adding course
  const handleOnClickSubmit = async () => {
    await setCourse((prevState) => {
      return {
        ...prevState,
        date: new Date(),
      };
    });
    if (
      course.courseName &&
      course.courseDuration &&
      course.courseFee &&
      course.courseDetails &&
      course.classType
    ) {
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "courses",
        doc: course,
        checkPermission: "write",
        userId: localStorage.getItem("userId"),
      })
        .then((result) => {
          setRefresh(true);
          handleClose();
          setLoader(false);
          toast.success("Course added successfully", {
            autoClose: 5000,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Please add required fields", {
        autoClose: 5000,
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
      classType: [0],
      date: "",
    });
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = () => {
    if (
      course.courseName &&
      course.courseDuration &&
      course.courseFee &&
      course.courseDetails &&
      course.classType
    ) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "courses",
        updatedTo: course,
        id: individualCourse.courseId,
        checkPermission: "update",
        userId: localStorage.getItem("userId"),
      })
        .then((result) => {
          setRefresh(true);
          handleClose();
          setLoader(false);
          toast.success("Course updated successfully", {
            autoClose: 5000,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Please fill all fields to update", {
        autoClose: 5000,
      });
    }
  };

  // 4. on deleting course
  const handleOnClickDelete = () => {
    setLoader(true);
    const userId = localStorage.getItem("userId");
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualCourse.courseId}&collectionName=courses&userId=${userId}`,
    })
      .then((result) => {
        setRefresh(true);
        handleClose();
        setLoader(false);
        toast.success("Course deleted successfully", {
          autoClose: 5000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <CourseModalPresentational
      courseModalType={courseModalType}
      handleClose={handleClose}
      course={course}
      setCourse={setCourse}
      handleOnClickSubmit={handleOnClickSubmit}
      handleOnClickUpdate={handleOnClickUpdate}
      handleOnClickDelete={handleOnClickDelete}
      classTypeList={classTypeList}
      loader={loader}
    ></CourseModalPresentational>
  );
}
