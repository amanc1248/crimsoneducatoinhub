import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { PaymentModalC } from "../../PaymentModal/PaymentModal.c";

export const IndividualEnrolledCourseC = ({ course, index, handleOnDeleteCourse }) => {
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
        <td>Rs. {course.actualCoursePrice}</td>
        <td>Rs. {course.padeAmount}</td>
        <td>Rs. {course.remainingAmount}</td>
        <td>
          <div>
            <div className={`${course.paymentStatus==='not paid' ? 'payment__not__paide': 'payment__paide'} `}> <strong>{course.paymentStatus}</strong> </div>
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
              handleOnDeleteCourse(course.id);
            }}
          >
            Delete
          </Button>
        </td>
      </tr>
    </>
  );
};
