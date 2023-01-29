import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateData } from "../../../../../actions/homeActions";
import { IndivudualAssignedCourseModalP } from "./IndividualAssignedCourseModal.p";

export function IndividualAssignedCourseModalC({
  handleOnCancelModal,
  course,
  allShifts,
}) {
  const selectedShifts = () => {
      const list = course?.shifts && course.shifts.map((shift, index) => ({
        _id: shift.shiftId,
        value: shift.value,
        label: shift.value,
      }));
      return list;
  };
  //   states
  const [assignedCourse, setAssignedCourse] = useState({
    assignedCourseId: course?.assignedCourseId,
    courseFee: course?.courseFee,
    courseId: course?.courseId,
    courseName: course?.courseName,
    endDate: course?.endDate,
    endMonth: course?.endMonth,
    endYear: course?.endYear,
    padeAmount: course?.padeAmount,
    paymentStatus: course?.paymentStatus,
    remainingAmount: course?.remainingAmount,
    salaryAmount: course?.salaryAmount,
    salaryPercentage: course?.salaryPercentage,
    shifts: selectedShifts(),
    startDate: course?.startDate,
    startMonth: course?.startMonth,
    startYear: course?.startYear,
    tutorId: course?.tutorId,
  });

  //   functions
  const handleOnChangeAssignedCourse = (fieldName, updatingValue) => {
    setAssignedCourse((prevState) => ({
      ...prevState,
      [fieldName]: updatingValue,
    }));
  };

  const calculateSalaryAmount = (percentage) => {
    const updatingValue = (percentage * assignedCourse.courseFee) / 100;
    handleOnChangeAssignedCourse("salaryAmount", updatingValue);
  };

  const handleOnUpdate = ()=>{
    updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "assignedCourses",
        updatedTo: assignedCourse,
        id: assignedCourse.assignedCourseId,
        checkPermission: "update",
        userId: localStorage.getItem("userId"),
      }).then((result)=>{
        if(result){
            toast.success("Assigned Course updated successfully", {
                autoClose: 5000,
              });
              handleOnCancelModal();
        }
      })
  }
  return (
    <IndivudualAssignedCourseModalP
      assignedCourse={assignedCourse}
      handleOnCancelModal={handleOnCancelModal}
      handleOnChangeAssignedCourse={handleOnChangeAssignedCourse}
      calculateSalaryAmount={calculateSalaryAmount}
      allShifts={allShifts}
      handleOnUpdate={handleOnUpdate}
    ></IndivudualAssignedCourseModalP>
  );
}
