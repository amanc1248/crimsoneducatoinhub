import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import Axios from "axios";

import { Image } from "cloudinary-react";

import Select from "react-select";

import {
  deleteData,
  getCourseData,
  insertData,
  updateData,
  insertPhoto,
  getOneModalAllDocuments,
  getOneModalDocumentsById,
} from "../../../actions/homeActions";

import TutorSalaryClass from "../TutorsSalary/TutorSalaryClass";
import { SalaryModalP } from "./SalaryModal.p";

export const SalaryModalC = ({
  course,
  showSalaryModal,
  setShowSalaryModal,
}) => {
  // data
  const salaryCalculations = {};

  // use states
  const [addSalary, setAddSalary] = useState();
  const [allSalarys, setAllSalarys] = useState([]);
  const [tutorSalary, setTutorSalary] = useState({
    salaryDate: "",
    amount: "",
    salaryDetails: "",
    chequePhoto: "",
  });

  // const [chequePhoto, setChequePhoto] = useState([]);

  // use effects
  useEffect(() => {
    getOneModalDocumentsById({
      url: "/api/commonRoute/getDocumentsById",
      collectionName: "tutorsCoursePayment",
      id: course.assignedCourseId,
    })
      .then((result) => {
        const list = result.map((salary, index) => {
          const obj = new TutorSalaryClass({
            salaryId: salary._id,
            assignedCourseId: salary.assignedCourseId,
            salaryDate: salary.salaryDate,
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

  const handleAddSalary = async () => {
    console.log(tutorSalary);
    const formData = new FormData();

    formData.append("file", tutorSalary.chequePhoto);
    formData.append("upload_preset", "farmersfrienduploadpreset");

    await Axios.post(
      "https://api.cloudinary.com/v1_1/gaurabcloudinary/image/upload",
      formData
    ).then((response) => {
      const filename = response.data.public_id;

      let obj = tutorSalary;
      obj = {
        ...obj,
        assignedCourseId: course.assignedCourseId,
        tutorId: course.tutorId,
        chequePhoto:filename
      };
      if (
        tutorSalary.salaryDate &&
        tutorSalary.amount &&
        tutorSalary.salaryDetails
      ) {
        insertData({
          url: "/api/commonRoute/insertData",
          collectionName: "tutorsCoursePayment",
          doc: obj,
        }).then(async (result) => {
          const tutorSalaryObject = new TutorSalaryClass({
            assignedCourseId: tutorSalary.assignedCourseId,
            tutorId: tutorSalary.tutorId,
            amount: tutorSalary.amount,
            salaryDate: tutorSalary.salaryDate,
            salaryDetails: tutorSalary.salaryDetails,
            salaryId: result.insertedId,
            filename: filename,
          });
          setAllSalarys((prevState) => {
            return [...prevState, tutorSalaryObject];
          });
          setTutorSalary({});
          setAddSalary(false);
        });
      }
    });
  };
  const handleOnShow = () => {
    setAddSalary(true);
  };
  const handleClose = () => {
    setAddSalary(false);
  };
  const handleOnDelete = async (id) => {
    deleteData({
      url: `/api/commonRoute/deleteData?id=${id}&collectionName=tutorsCoursePayment`,
    })
      .then(async (result) => {
        setAllSalarys((prevState) => {
          return prevState.filter((salary) => {
            return salary.salaryId !== id;
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
    allSalarys.map((salary) => {
      paid = paid + parseInt(salary.amount);
      return paid;
    });
    remainingAmount = parseInt(course.salary) - paid;
    salaryCalculations.totalAmount = parseInt(course.salary);
    salaryCalculations.paidAmount = paid;
    salaryCalculations.remainingAmount = remainingAmount;
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
    ></SalaryModalP>
  );
};
