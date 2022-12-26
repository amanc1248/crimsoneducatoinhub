import { useEffect, useState } from "react";
import { AssignedCoursesPresentational } from "./AssignedCoursesPresentational";
import {
  deleteData,
  getOneModalAllDocuments,
  getOneModalDocumentsById,
  insertData,
} from "../../../actions/homeActions";
import { datesList, monthsList, yearsList } from "../../../Data/StudentsData";
import AssignedCourse from "../../../classes/AssignedCourses.Class";

export const AssignedCoursesContainer = ({
  show,
  setShow,
  individualTutor,
  setRefresh,
}) => {
  console.log("individual tutor: ", individualTutor)

  const assignedCourse = {};

  // usestates

  const [addCourse, setAddCourse] = useState(false);
  const [assignedCourses, setAssignedCourses] = useState([]);

  const [allCourses, setAllCourses] = useState();

  const [allShifts, setAllShifts] = useState();

  const [showSalaryHistoryModal, setSalaryHistoryModal] = useState(false);

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
      collectionName: "assignedCourses",
      filter: {tutorId:individualTutor._id}
    })
      .then((result) => {
        const list = result.map((course, index) => {
          const obj = new AssignedCourse({
            assignedCourseId: course._id,
            courseId: course.courseId,
            courseName: course.courseName,
            year: course.year,
            month: course.month,
            startDate: course.startDate,
            endDate: course.endDate,
            shiftId: course.shiftId,
            shift: course.shift,
            paymentStatus: course.paymentStatus,
            salary: course.salary,
            tutorId: course.tutorId,
            padeAmount:course.padeAmount,
            remainingAmount: course.remainingAmount
          });
          return obj;
        });
        console.log("The list of courses: ", list[0]);
        setAssignedCourses(list);
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
    console.log(assignedCourse);
    // alert(assignedCourse);
    assignedCourse.paymentStatus = "not paid";
    assignedCourse.padeAmount = 0;
    assignedCourse.remainingAmount = assignedCourse.salary;
    if (
      assignedCourse.courseId &&
      assignedCourse.courseName &&
      assignedCourse.month &&
      assignedCourse.year &&
      assignedCourse.startDate &&
      assignedCourse.endDate &&
      assignedCourse.shift &&
      assignedCourse.shiftId &&
      assignedCourse.salary
    ) {
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "assignedCourses",
        doc: assignedCourse,
      }).then((result) => {
        const assignedCourseObject = new AssignedCourse({
          assignedCourseId: result.insertedId,
          courseId: assignedCourse.courseId,
          courseName: assignedCourse.courseName,
          year: assignedCourse.year,
          month: assignedCourse.month,
          startDate: assignedCourse.startDate,
          endDate: assignedCourse.endDate,
          shiftId: assignedCourse.shiftId,
          shift: assignedCourse.shift,
          paymentStatus: assignedCourse.paymentStatus,
          salary: assignedCourse.salary,
          tutorId: individualTutor._id,
          padeAmount:0,
          remainingAmount:assignedCourse.salary
        });
        setAssignedCourses((prevState) => {
          return [...prevState, assignedCourseObject];
        });

        setAddCourse(false);
      });
    }
  };
  
  const handleOnDeleteAssignedCourse = (id) => {
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=assignedCourses`,
    })
      .then((result) => {
        setAssignedCourses((prevState) => {
          return prevState.filter((course) => {
            return course.assignedCourseId !== id;
          });
        });
        hideAddCourse();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <AssignedCoursesPresentational
      show={show}
      setShow={setShow}
      individualTutor={individualTutor}
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
      handleOnAddCourse={handleOnAddCourse}
      assignedCourses={assignedCourses}
      assignedCourse={assignedCourse}
      handleOnDeleteAssignedCourse={handleOnDeleteAssignedCourse}
      onHandleCourseDelete={handleOnDeleteAssignedCourse}
    ></AssignedCoursesPresentational>
  );
};
