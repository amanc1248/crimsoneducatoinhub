import React, { useEffect, useState } from "react";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { CoursesPresentational } from "./Courses.p";
import CourseClass from "../../classes/Courses.Class";

export const CoursesContainer = () => {
  // use states
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [unModifiableOrignalList, setUnModifiableOrignalList] = useState([]);
  const [loader, setLoader] = useState(false);

  // use effect
  useEffect(() => {
    getOneModalTotalCount({
      url: "/api/commonRoute/getOneModalTotalCount",
      collectionName: "courses",
    })
      .then((result) => {
        setTotalPages(result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (refresh) {
      setLoader(true);
      getAllData({
        url: "/api/commonRoute/getData",
        collectionName: "courses",
        pageNumber: currentPage,
        nPerPage: 100,
      })
        .then((result) => {
          setUnModifiableOrignalList(result);
          const list = result.map((course, index) => {
            const courseObj = new CourseClass({
              courseId: course._id,
              courseName: course.courseName,
              courseDuration: course.courseDuration,
              courseFee: course.courseFee,
              courseDetails: course.courseDetails,
              typeClass: course.typeClass,
            });
            setLoader(false);
            return courseObj;
          });
          setCourses(list);
          setRefresh(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [refresh]);

  useEffect(() => {
    setLoader(true);
    getAllData({
      url: "/api/commonRoute/getData",
      collectionName: "courses",
      pageNumber: currentPage,
      nPerPage: 100,
    })
      .then((result) => {
        setUnModifiableOrignalList(result);
        const list = result.map((course, index) => {
          const courseObj = new CourseClass({
            courseId: course._id,
            courseName: course.courseName,
            courseDuration: course.courseDuration,
            courseFee: course.courseFee,
            courseDetails: course.courseDetails,
            typeClass: course.typeClass,
          });
          return courseObj;
        });
        setCourses(list);
        setRefresh(false);
        setLoader(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  return (
    <CoursesPresentational
      showModal={showModal}
      setShowModal={setShowModal}
      courses={courses}
      setCourses={setCourses}
      setRefresh={setRefresh}
      unModifiableOrignalList={unModifiableOrignalList}
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
      loader={loader}
    ></CoursesPresentational>
  );
};
