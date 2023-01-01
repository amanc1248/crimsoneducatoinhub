import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { LoaderFallingLines } from "../../../../components/Loader";
import { SalaryModalC } from "../../SalaryModal/SalaryModal.c";
// import { PaymentModalC } from "../../PaymentModal/PaymentModal.c";

export const IndividualAssignedCourseC = ({
  course,
  index,
  onHandleCourseDelete,
  loading,
  deleteLoading,
  individualTutor
}) => {
  const [showModal, setShowModal] = useState(false);
  console.log("assigned course: ", course);
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
        <td>{course?.shift}</td>
        <td>Rs. {course?.salary}</td>
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
                // onHandleCourseDelete(course._id);
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
