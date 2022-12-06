import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { SalaryModalC } from "../../SalaryModal/SalaryModal.c";
// import { PaymentModalC } from "../../PaymentModal/PaymentModal.c";

export const IndividualAssignedCourseC = ({
  course,
  index,
  handleOnDeleteAssignedCourse,
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && (
        <SalaryModalC
          course={course}
          showSalaryModal={showModal}
          setShowSalaryModal={setShowModal}
        ></SalaryModalC>
      )}

      <tr key={course._id}>
        <td>{index + 1}</td>
        <td>{course.courseName}</td>
        <td>{course.year}</td>
        <td>{course.month}</td>
        <td>{course.startDate}</td>
        <td>{course.endDate}</td>
        <td>{course.shift}</td>
        <td>{course.salary}</td>{" "}
        <td>
          <div>
            <div>{course.paymentStatus}</div>
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
          <Button
            variant="danger"
            size="sm"
            className="button__size"
            onClick={() => {
              // onHandleCourseDelete(course._id);
              // handleOnDeleteAssignedCourse(course.assignedCourseId);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
