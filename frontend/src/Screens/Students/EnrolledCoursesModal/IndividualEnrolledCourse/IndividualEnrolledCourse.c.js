import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { PaymentModalC } from "../../PaymentModal/PaymentModal.c";

export const IndividualEnrolledCourseC = ({ course, index }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      {showModal && <PaymentModalC course={course} showPaymentModal={showModal} setShowPaymentModal={setShowModal}></PaymentModalC>}

      <tr>
        <td>{index + 1}</td>
        <td>{course.courseName}</td>
        <td>{course.year}</td>
        <td>{course.month}</td>
        <td>{course.startDate}</td>
        <td>{course.endDate}</td>
        <td>{course.shift}</td>
        <td>{course.actualCoursePrice}</td>
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
              // handleOnDeleteCourse(course.enrolledCourseId);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
