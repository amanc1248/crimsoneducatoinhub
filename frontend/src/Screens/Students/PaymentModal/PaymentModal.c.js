import React, { useEffect, useState } from "react";
import {
  deleteData,
  getOneModalDocumentsById,
  insertData,
  updateData,
} from "../../../actions/homeActions";
import StudentPaymentClass from "../StudentsPayment/StudentPaymentClass";
import { PaymentModalP } from "./PaymentModal.p";

export const PaymentModalC = ({
  course,
  showPaymentModal,
  setShowPaymentModal,
}) => {
  console.log("course:::", course);

  // data
  const paymentCalculations = {};

  // use states
  const [addPayment, setAddPayment] = useState();
  const [allPayments, setAllPayments] = useState([]);
  const [studentPayment, setStudentPayment] = useState({
    paymentDate: "",
    amount: "",
    paymentDetails: "",
  });
  const [paymentStatus, setPaymentStatus] = useState();

  // use effects
  useEffect(() => {
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "studentsCoursePayment",
      filter: {enrolledCourseId: course.id},
    })
      .then((result) => {
        const list = result.map((payment, index) => {
          const obj = new StudentPaymentClass({
            paymentId: payment._id,
            enrolledCourseId: payment.enrolledCourseId,
            paymentDate: payment.paymentDate,
            amount: payment.amount,
            paymentDetails: payment.paymentDetails,
            studentId: payment.studentId,
          });
          return obj;
        });
        setAllPayments(list);
        console.log(list);
      })
      .catch((e) => console.log(e));
  }, []);

  // functions
  const handleOnShow = () => {
    setAddPayment(true);
  };
  const handleAddPayment = async () => {
    let studentObj = studentPayment;
    studentObj = {
      ...studentObj,
      enrolledCourseId: course.id,
      studentId: course.studentId,
    };
    if (
      studentPayment.paymentDate &&
      studentPayment.amount &&
      studentPayment.paymentDetails
    ) {
     const insertedData = await insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "studentsCoursePayment",
        doc: studentObj,
      });
      if(insertedData){
        const studentPaymentObject = new StudentPaymentClass({
          enrolledCourseId: studentPayment.enrolledCourseId,
          studentId: studentPayment.studentId,
          amount: studentPayment.amount,
          paymentDate: studentPayment.paymentDate,
          paymentDetails: studentPayment.paymentDetails,
          paymentId: insertData.insertedId,
        });
        setAllPayments((prevState) => {
          return [...prevState, studentPaymentObject];
        });
        setStudentPayment({});
        setAddPayment(false);
      }else{
        console.log("error")
      }
    }
  };

  const handleClose = () => {
    setAddPayment(false);
  };

  const handleOnDelete = async (id) => {
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=studentsCoursePayment`,
    })
      .then(async (result) => {
        setAllPayments((prevState) => {
          return prevState.filter((payment) => {
            return payment.paymentId !== id;
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const calculatePayments = () => {
    let paid = 0;
    let remainingAmount;
    allPayments.map((payment) => {
      paid = paid + parseInt(payment.amount);
      return paid;
    });
    remainingAmount = parseInt(course.actualCoursePrice) - paid;
    paymentCalculations.totalAmount = parseInt(course.actualCoursePrice);
    paymentCalculations.paidAmount = paid;
    paymentCalculations.remainingAmount = remainingAmount;
  };
  calculatePayments();

  const checkTotalAmountAndSet = (amount) => {
    if (amount <= paymentCalculations.remainingAmount) {
      setStudentPayment((prevState) => {
        return {
          ...prevState,
          amount: amount,
        };
      });
    }
  };
  return (
    <PaymentModalP
      addPayment={addPayment}
      handleClose={handleClose}
      handleAddPayment={handleAddPayment}
      handleOnShow={handleOnShow}
      showPaymentModal={showPaymentModal}
      setShowPaymentModal={setShowPaymentModal}
      allPayments={allPayments}
      setAllPayments={setAllPayments}
      handleOnDelete={handleOnDelete}
      course={course}
      paymentCalculations={paymentCalculations}
      checkTotalAmountAndSet={checkTotalAmountAndSet}
      studentPayment={studentPayment}
      setStudentPayment={setStudentPayment}
    ></PaymentModalP>
  );
};
