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
import { toast } from "react-toastify";
import { removeDuplicates, removeDuplicatesWithFieldName } from "../../../utils/utils";
export const EnrolledCoursesModalContainer = ({
  show,
  setShow,
  individualStudent,
  setRefresh,
}) => {
  // data
  // USESTATES
  const [enrolledCourse, setEnrolledCourse] = useState({});
  const [allCourses, setAllCourses] = useState();
  const [allTutors, setAllTutors] = useState();
  const [allShifts, setAllShifts] = useState();
  const [addCourse, setAddCourse] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [tutorLoading, setTutorLoading] = useState(false);
  // USE EFFECTS
  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "courses",
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
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
      })
      .catch((e) => console.log(e));

    // for fetching enrolled courses
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "enrolledCourses",
      filter: { studentId: individualStudent._id },
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
    })
      .then((result) => {
        const list = result.map((course, index) => {
          const obj = new EnrolledCourse({
            id: course._id,
            courseId: course.courseId,
            courseName: course.courseName,
            startYear: course.startYear,
            startMonth: course.startMonth,
            startDate: course.startDate,
            endYear: course.endYear,
            endMonth: course.endMonth,
            endDate: course.endDate,
            shiftId: course.shiftId,
            shift: course.shift,
            paymentStatus: course.paymentStatus,
            actualCoursePrice: course.actualCoursePrice,
            studentId: course.studentId,
            padeAmount: course.padeAmount,
            remainingAmount: course.remainingAmount,
            assignedCourseId: course.assignedCourseId,
          });
          return obj;
        });
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
    enrolledCourse.padeAmount = 0;
    enrolledCourse.remainingAmount = enrolledCourse.actualCoursePrice;
    if (
      enrolledCourse.courseId &&
      enrolledCourse.courseName &&
      enrolledCourse.startMonth &&
      enrolledCourse.startYear &&
      enrolledCourse.startDate &&
      enrolledCourse.endYear &&
      enrolledCourse.endMonth &&
      enrolledCourse.endDate &&
      enrolledCourse.shift &&
      enrolledCourse.shiftId &&
      enrolledCourse.actualCoursePrice
    ) {
      setLoading(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "enrolledCourses",
        doc: enrolledCourse,
        checkPermission: "write",
        userId: localStorage.getItem("userId"),
      }).then((result) => {
        const enrolledCourseObject = new EnrolledCourse({
          id: result.insertedId,
          courseId: enrolledCourse.courseId,
          courseName: enrolledCourse.courseName,
          startYear: enrolledCourse.startYear,
          startMonth: enrolledCourse.startMonth,
          startDate: enrolledCourse.startDate,
          endYear: enrolledCourse.endYear,
          endMonth: enrolledCourse.endMonth,
          endDate: enrolledCourse.endDate,
          shiftId: enrolledCourse.shiftId,
          shift: enrolledCourse.shift,
          paymentStatus: enrolledCourse.paymentStatus,
          actualCoursePrice: enrolledCourse.actualCoursePrice,
          studentId: individualStudent._id,
          padeAmount: 0,
          remainingAmount: enrolledCourse.actualCoursePrice,
        });
        setEnrolledCourses((prevState) => {
          return [...prevState, enrolledCourseObject];
        });
        setAddCourse(false);
        setLoading(false);
        toast.success("Course enrolled to student successfully", {
          autoClose: 5000,
        });
      });
    } else {
      toast.error("Add required fields to add course", { autoClose: 5000 });
    }
  };
  const handleOnUpdateCourse = async (id) => {
    alert(id);
  };

  const handleOnDeleteCourse = (id) => {
    setDeleteLoading(true);
    const userId = localStorage.getItem("userId");
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=enrolledCourses&userId=${userId}`,
    })
      .then((result) => {
        setEnrolledCourses((prevState) => {
          return prevState.filter((course) => {
            return course.id !== id;
          });
        });
        hideAddCourse();
        setDeleteLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleCourseChange = (e) => {
    enrolledCourse.courseId = e._id;
    enrolledCourse.courseName = e.value;
    enrolledCourse.studentId = individualStudent._id;
    setTutorLoading(true);
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "assignedCourses",
      filter: {courseId:e._id},
      checkPermission:'read',
        userId:localStorage.getItem('userId')
    }).then((result)=>{
      const list = result.map((tutor, index) => {
        const obj = {
          _id: tutor.tutorId,
          label: tutor.tutorName,
          value: tutor.tutorName,
          assignedCourseId: tutor._id,
          shifts: tutor.shifts
        };
        return obj;
      });
      const thelist = removeDuplicatesWithFieldName(list, list.length,"_id");
      setAllTutors(thelist)
      setTutorLoading(false);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      setTutorLoading(false);
    })
  }

  const handleOnChangeTutor = (tutorId)=>{
    allTutors.map((tutor)=>{
      if(tutor._id===tutorId){
        const shiftLists = tutor.shifts.map((shift, index) => {
          const obj = {
            _id: shift.shiftId,
            label: shift.value,
            value: shift.value,
          };
          return obj;
        });
        setAllShifts(shiftLists);
      }
    })
  }
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
      loading={loading}
      deleteLoading={deleteLoading}
      handleCourseChange={handleCourseChange}
      allTutors={allTutors}
      tutorLoading={tutorLoading}
      handleOnChangeTutor={handleOnChangeTutor}
    ></EnrolledCoursesPresentataional>
  );
};
