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
import { toast } from "react-toastify";

export const AssignedCoursesContainer = ({
  show,
  setShow,
  individualTutor,
  setRefresh,
}) => {
  // usestates

  const [assignedCourse, setAssignedCourse] = useState({});
  const [addCourse, setAddCourse] = useState(false);
  const [assignedCourses, setAssignedCourses] = useState([]);

  const [allCourses, setAllCourses] = useState();

  const [allShifts, setAllShifts] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [courseFee, setCourseFee] = useState();
  const [salaryAmount, setSalaryAmount] = useState(0);
  const [courseFeeLoading, setCourseFeeLoading] = useState(false);
  const [selectedShifts, setSelectedShifts] = useState();
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

    // for fetching shifts
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "shifts",
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
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
      filter: { tutorId: individualTutor._id },
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
    })
      .then((result) => {
        const list = result.map((course, index) => {
          const obj = new AssignedCourse({
            assignedCourseId: course._id,
            courseId: course.courseId,
            courseName: course.courseName,
            startYear: course.startYear,
            startMonth: course.startMonth,
            startDate: course.startDate,
            endDate: course.endDate,
            endMonth: course.endMonth,
            endYear: course.endYear,
            shifts: course.shifts,
            paymentStatus: course.paymentStatus,
            salaryPercentage: course.salaryPercentage,
            salaryAmount: course.salaryAmount,
            tutorId: course.tutorId,
            padeAmount: course.padeAmount,
            remainingAmount: course.remainingAmount,
            courseFee: course.courseFee,
          });
          return obj;
        });
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
    setCourseFee();
  };

  const handleOnAddCourse = () => {
    assignedCourse.paymentStatus = "not paid";
    assignedCourse.padeAmount = 0;
    assignedCourse.remainingAmount = salaryAmount;
    assignedCourse.shifts = selectedShifts;
    assignedCourse.courseFee = courseFee;
    console.log("The Doc: ", assignedCourse);

    if (
      assignedCourse.courseId &&
      assignedCourse.courseName &&
      assignedCourse.startMonth &&
      assignedCourse.startYear &&
      assignedCourse.startDate &&
      assignedCourse.endDate &&
      assignedCourse.endMonth &&
      assignedCourse.shifts &&
      assignedCourse.endYear &&
      assignedCourse.salaryPercentage &&
      salaryAmount
    ) {
      setLoading(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "assignedCourses",
        doc: assignedCourse,
        checkPermission: "write",
        userId: localStorage.getItem("userId"),
      }).then((result) => {
        const assignedCourseObject = new AssignedCourse({
          assignedCourseId: result.insertedId,
          courseId: assignedCourse.courseId,
          courseName: assignedCourse.courseName,
          startYear: assignedCourse.startYear,
          startMonth: assignedCourse.startMonth,
          startDate: assignedCourse.startDate,
          endYear: assignedCourse.endYear,
          endMonth: assignedCourse.endMonth,
          endDate: assignedCourse.endDate,
          shiftId: assignedCourse.shiftId,
          shift: assignedCourse.shift,
          paymentStatus: assignedCourse.paymentStatus,
          salaryAmount: assignedCourse.salaryAmount,
          salaryPercentage: assignedCourse.salaryPercentage,
          tutorId: individualTutor._id,
          padeAmount: 0,
          remainingAmount: salaryAmount,
          courseFee: assignedCourse.courseFee,
        });
        setAssignedCourses((prevState) => {
          return [...prevState, assignedCourseObject];
        });
        setAddCourse(false);
        setLoading(false);
        toast.success("Course assigned successfully", {
          autoClose: 5000,
        });
      });
    } else {
      toast.error("Please add the required fields", {
        autoClose: 5000,
      });
    }
  };

  const handleOnDeleteAssignedCourse = (id) => {
    setDeleteLoading(true);
    const userId = localStorage.getItem("userId");
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=assignedCourses&userId=${userId}`,
    })
      .then((result) => {
        setAssignedCourses((prevState) => {
          return prevState.filter((course) => {
            return course.assignedCourseId !== id;
          });
        });
        hideAddCourse();
        setDeleteLoading(false);
        toast.success("Assigned course deleted successfully", {
          autoClose: 5000,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleOnChangeCourse = (e) => {
    assignedCourse.courseId = e._id;
    assignedCourse.courseName = e.value;
    assignedCourse.tutorId = individualTutor._id;
    assignedCourse.tutorName = individualTutor.name;
    setCourseFeeLoading(true);
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "courses",
      filter: { _id: e._id },
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
    })
      .then((result) => {
        setCourseFee(parseInt(result[0].courseFee));
        setCourseFeeLoading(false);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setCourseFeeLoading(false);
      });
  };
  const calculateSalaryAmount = (percentage) => {
    setSalaryAmount((percentage * courseFee) / 100);
    assignedCourse.salaryAmount = (percentage * courseFee) / 100;
    assignedCourse.salaryPercentage = percentage;
  };

  const handleSelectedShifts = (shifts) => {
    setSelectedShifts(
      shifts.map((u) => {
        return {
          value: u.value,
          shiftId: u._id,
        };
      })
    );
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
      loading={loading}
      deleteLoading={deleteLoading}
      handleOnChangeCourse={handleOnChangeCourse}
      courseFee={courseFee}
      calculateSalaryAmount={calculateSalaryAmount}
      salaryAmount={salaryAmount}
      courseFeeLoading={courseFeeLoading}
      selectedShifts={selectedShifts}
      handleSelectedShifts={handleSelectedShifts}
    ></AssignedCoursesPresentational>
  );
};
