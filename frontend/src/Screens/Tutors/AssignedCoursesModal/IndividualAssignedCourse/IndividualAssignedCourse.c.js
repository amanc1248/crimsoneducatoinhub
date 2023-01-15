import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { LoaderFallingLines } from "../../../../components/Loader";
import { SalaryModalC } from "../../SalaryModal/SalaryModal.c";
// import { PaymentModalC } from "../../PaymentModal/PaymentModal.c";
import "../../../../styles/screens/home.css";
export const IndividualAssignedCourseC = ({
  course,
  index,
  onHandleCourseDelete,
  loading,
  deleteLoading,
  individualTutor,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <SalaryModalC
          course={course}
          showSalaryModal={showModal}
          setShowSalaryModal={setShowModal}
          individualTutor={individualTutor}
        ></SalaryModalC>
      )}

      <tr key={course._id}>
        <td>{index + 1}</td>
        <td>{course?.courseName}</td>
        <td>{course?.startYear}</td>
        <td>{course?.startMonth}</td>
        <td>{course?.startDate}</td>
        <td>{course?.endYear}</td>
        <td>{course?.endMonth}</td>
        <td>{course?.endDate}</td>
        <td>
          <div className="">
            {course?.shifts &&
              course.shifts.map((shift, index) => {
                return (
                  <div className="shift__div">
                    {index + 1}: {shift.value}
                  </div>
                );
              })}
          </div>
        </td>
        <td>{course?.salaryPercentage} %</td>
        <td>Rs. {course?.salaryAmount}</td>
        <td>Rs. {course?.padeAmount}</td>
        <td>Rs. {course?.remainingAmount}</td>
        <td>
          <div>
            <div
              className={`${
                course.paymentStatus === "not paid"
                  ? "payment__not__paide"
                  : "payment__paide"
              } `}
            >
              {" "}
              <strong>{course.paymentStatus}</strong>{" "}
            </div>
            <div
              className="see__details__link"
              onClick={() => {
                setShowModal(true);
              }}
            >
              See Details
            </div>
          </div>
        </td>
        <td>
          {deleteLoading ? (
            <LoaderFallingLines></LoaderFallingLines>
          ) : (
            <Button
              variant="danger"
              size="sm"
              className="button__size"
              onClick={() => {
                onHandleCourseDelete(course.assignedCourseId);
              }}
            >
              Delete
            </Button>
          )}
        </td>
      </tr>
    </>
  );
};
