import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
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
  student,
}) => {
  console.log("course:::", course);

  // data
  const paymentCalculations = {};

  // use states
  const [addPayment, setAddPayment] = useState();
  const [allPayments, setAllPayments] = useState([]);
  const [addedOrDeletedSalary, setAddedOrDeletedSalary] = useState(false);
  const [studentPayment, setStudentPayment] = useState({
    year: "",
    month: "",
    date: "",
    amount: "",
    paymentDetails: "",
  });
  const [loading, setLoading] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  // use effects
  useEffect(() => {
    setLoading(true);
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "studentsCoursePayment",
      filter: { enrolledCourseId: course.id },
      checkPermission: "read",
      userId: localStorage.getItem("userId"),
    })
      .then((result) => {
        const list = result.map((payment, index) => {
          const obj = new StudentPaymentClass({
            paymentId: payment._id,
            enrolledCourseId: payment.enrolledCourseId,
            date: payment.date,
            month: payment.month,
            year: payment.year,
            amount: payment.amount,
            paymentDetails: payment.paymentDetails,
            studentId: payment.studentId,
            assignedCourseId: payment.assignedCourseId,
          });
          return obj;
        });
        setAllPayments(list);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  // for updating the payment status
  useEffect(() => {
    if (addedOrDeletedSalary) {
      course.paymentStatus =
        paymentCalculations?.paidAmount === paymentCalculations?.totalAmount
          ? "paid"
          : "not paid";
      course.padeAmount = paymentCalculations.paidAmount;
      course.remainingAmount = paymentCalculations.remainingAmount;
      const newObj = JSON.parse(JSON.stringify(course));

      const _id = course.id;
      delete newObj["id"];
      newObj._id = _id;
      newObj.padeAmount = paymentCalculations?.paidAmount;
      newObj.remainingAmount = paymentCalculations?.remainingAmount;
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "enrolledCourses",
        updatedTo: newObj,
        id: course.id,
        checkPermission: "update",
        userId: localStorage.getItem("userId"),
      })
        .then((result) => {
          setAddedOrDeletedSalary(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [addedOrDeletedSalary]);

  // functions
  const handleOnShow = () => {
    setAddPayment(true);
  };
  const handleAddPayment = async () => {
    console.log("course: ", course);
    let studentObj = studentPayment;
    studentObj = {
      ...studentObj,
      enrolledCourseId: course.id,
      studentId: course.studentId,
      assignedCourseId: course.assignedCourseId,
    };
    if (
      studentPayment.year &&
      studentPayment.month &&
      studentPayment.date &&
      studentPayment.amount &&
      studentPayment.paymentDetails
    ) {
      setLoading(true);
      const insertedData = await insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "studentsCoursePayment",
        doc: studentObj,
        checkPermission: "write",
        userId: localStorage.getItem("userId"),
      });
      if (insertedData) {
        console.log(insertedData);
        const studentPaymentObject = new StudentPaymentClass({
          enrolledCourseId: studentObj.enrolledCourseId,
          studentId: studentObj.studentId,
          amount: studentPayment.amount,
          year: studentPayment.year,
          month: studentPayment.month,
          date: studentPayment.date,
          paymentDetails: studentPayment.paymentDetails,
          paymentId: insertedData.insertedId,
        });
        console.log(studentPaymentObject);
        setAllPayments((prevState) => {
          return [...prevState, studentPaymentObject];
        });
        setStudentPayment({});
        setAddPayment(false);
        setAddedOrDeletedSalary(true);
        setLoading(false);
        toast.success("Payment added successfully", { autoClose: 5000 });
      } else {
        console.log("error");
      }
    } else {
      toast.error("Add required fields to add payment", { autoClose: 5000 });
    }
  };

  const handleClose = () => {
    setAddPayment(false);
  };

  const handleOnDelete = async (id) => {
    const userId = localStorage.getItem("userId");

    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=studentsCoursePayment&userId=${userId}`,
    })
      .then(async (result) => {
        setAllPayments((prevState) => {
          return prevState.filter((payment) => {
            return payment.paymentId !== id;
          });
        });
        setAddedOrDeletedSalary(true);
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
  const handleGenerateInvoice = () => {
    setShowInvoice(!showInvoice);
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
      loading={loading}
      showInvoice={showInvoice}
      student={student}
      handleGenerateInvoice={handleGenerateInvoice}
    ></PaymentModalP>
  );
};
