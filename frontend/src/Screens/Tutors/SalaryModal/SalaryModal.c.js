import React, { useEffect, useState } from "react";
import Axios from "axios";

import {
  deleteData,
  insertData,
  getOneModalDocumentsById,
  updateData,
} from "../../../actions/homeActions";

import TutorSalaryClass from "../TutorsSalary/TutorSalaryClass";
import { SalaryModalP } from "./SalaryModal.p";
import { toast } from "react-toastify";

export const SalaryModalC = ({
  course,
  showSalaryModal,
  setShowSalaryModal,
  individualTutor
}) => {
  console.log("COURSE: ", course)
  // data
  const salaryCalculations = {};

  // use states
  const [addSalary, setAddSalary] = useState();
  const [allSalarys, setAllSalarys] = useState([]);
  const [addedOrDeletedSalary, setAddedOrDeletedSalary] = useState(false);
  const [tutorSalary, setTutorSalary] = useState({
    year: "",
    month:"",
    date:"",
    amount: "",
    salaryDetails: "",
    chequePhoto: "",
  });
  const [addSalaryLoading, setAddSalaryLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // use effects
  // 1. getting tutorsCoursePayment by id in the beginning
  useEffect(() => {
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "tutorsCoursePayment",
      id: course.assignedCourseId,
      filter: { assignedCourseId: course.assignedCourseId },
      checkPermission:'read',
        userId:localStorage.getItem('userId')
    })
      .then((result) => {
        const list = result.map((salary, index) => {
          const obj = new TutorSalaryClass({
            salaryId: salary._id,
            assignedCourseId: salary.assignedCourseId,
            year: salary.year,
            month:salary.month,
            date: salary.date,
            amount: salary.amount,
            salaryDetails: salary.salaryDetails,
            tutorId: salary.tutorId,
            filename: salary.chequePhoto,
          });
          return obj;
        });
        setAllSalarys(list);
        console.log(list);
      })
      .catch((e) => console.log(e));
  }, []);

  // for updating the payment status
  useEffect(() => {
    if (addedOrDeletedSalary) {
      course.paymentStatus =
        salaryCalculations?.paidAmount === salaryCalculations?.totalAmount
          ? "paid"
          : "not paid";
      course.padeAmount = salaryCalculations.paidAmount;
      course.remainingAmount = salaryCalculations.remainingAmount;
      const newObj = JSON.parse(JSON.stringify(course));
      const _id = course.assignedCourseId;
      delete newObj["assignedCourseId"];
      newObj._id = _id;
      newObj.padeAmount = salaryCalculations.paidAmount;
      newObj.remainingAmount = salaryCalculations.remainingAmount;
      console.log("New obj: ", newObj);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "assignedCourses",
        updatedTo: newObj,
        id: course.assignedCourseId,
        checkPermission:'update',
        userId:localStorage.getItem('userId')
      })
        .then((result) => {
          toast.success("Payment Status updated Successfully", {
            autoClose: 5000,
          });
          setAddedOrDeletedSalary(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [addedOrDeletedSalary]);

  // on adding salary
  const handleAddSalary = async () => {
    console.log("TutorSalary: ", tutorSalary);
    if (
      tutorSalary.amount &&
      tutorSalary.chequePhoto &&
      tutorSalary.year &&
      tutorSalary.month &&
      tutorSalary.date &&
      tutorSalary.salaryDetails
    ) {
      setAddSalaryLoading(true);
      const formData = new FormData();
      formData.append("file", tutorSalary.chequePhoto);
      formData.append("upload_preset", "farmersfrienduploadpreset");

      await Axios.post(
        "https://api.cloudinary.com/v1_1/gaurabcloudinary/image/upload",
        formData
      )
        .then((response) => {
          const filename = response.data.public_id;

          let obj = tutorSalary;
          obj = {
            ...obj,
            assignedCourseId: course.assignedCourseId,
            tutorId: course.tutorId,
            chequePhoto: filename,
          };
          if (
            tutorSalary.year &&
            tutorSalary.amount &&
            tutorSalary.salaryDetails &&
            filename
          ) {
            console.log("Final Object: ", obj);
            insertData({
              url: "/api/commonRoute/insertData",
              collectionName: "tutorsCoursePayment",
              doc: obj,
              checkPermission:'write',
        userId:localStorage.getItem('userId')
            }).then(async (result) => {
              const tutorSalaryObject = new TutorSalaryClass({
                assignedCourseId: tutorSalary.assignedCourseId,
                tutorId: tutorSalary.tutorId,
                amount: tutorSalary.amount,
                year: tutorSalary.year,
                month:tutorSalary.month,
                date: tutorSalary.date,
                salaryDetails: tutorSalary.salaryDetails,
                salaryId: result.insertedId,
                filename: filename,
              });
              setAllSalarys((prevState) => {
                return [...prevState, tutorSalaryObject];
              });

              setTutorSalary({});
              setAddSalary(false);
              setAddedOrDeletedSalary(true);
              setAddSalaryLoading(false)
            });
          }
        })
        .catch((err) => {
          toast.error("err", { autoClose: 5000 });
        });
    }else{
      toast.error("Please add the required fields", { autoClose: 5000 });
    }
  };

  const handleOnShow = () => {
    setAddSalary(true);
  };
  const handleClose = () => {
    setAddSalary(false);
  };
  const handleOnDelete = async (id) => {
    const userId =localStorage.getItem('userId');
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=tutorsCoursePayment&userId=${userId}`,
    })
      .then(async (result) => {
        setAllSalarys((prevState) => {
          return prevState.filter((salary) => {
            return salary.salaryId !== id;
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
    allSalarys.map((salary) => {
      paid = paid + parseInt(salary.amount);
      return paid;
    });
    remainingAmount = parseInt(course.salaryAmount) - paid;
    salaryCalculations.totalAmount = parseInt(course.salaryAmount);
    salaryCalculations.paidAmount = paid;
    salaryCalculations.remainingAmount = remainingAmount;
    // console.log("salary calculations: ", salaryCalculations)
  };
  calculatePayments();

  const checkTotalAmountAndSet = (amount) => {
    if (amount <= salaryCalculations.remainingAmount) {
      setTutorSalary((prevState) => {
        return {
          ...prevState,
          amount: amount,
        };
      });
    }
  };
  return (
    <SalaryModalP
      addSalary={addSalary}
      handleClose={handleClose}
      handleAddSalary={handleAddSalary}
      handleOnShow={handleOnShow}
      showSalaryModal={showSalaryModal}
      setShowSalaryModal={setShowSalaryModal}
      allSalarys={allSalarys}
      setAllSalarys={setAllSalarys}
      handleOnDelete={handleOnDelete}
      course={course}
      salaryCalculations={salaryCalculations}
      checkTotalAmountAndSet={checkTotalAmountAndSet}
      tutorSalary={tutorSalary}
      setTutorSalary={setTutorSalary}
      addSalaryLoading={addSalaryLoading}
    individualTutor={individualTutor}
    ></SalaryModalP>
  );
};
