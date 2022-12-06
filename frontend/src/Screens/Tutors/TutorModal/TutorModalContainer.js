import React, { useState } from "react";
import {
  deleteData,
  insertData,
  updateData,
} from "../../../actions/homeActions";
import { TutorModalPresentational } from "./TutorModalPresentational";

export function TutorModal({
  show,
  setShow,
  tutors,
  setTutors,
  individualTutor,
  courseModalType,
  setRefresh,
}) {
  const qualificationList = [
    { label: "Japanese Language Instructor", value: "exp1" },
    { label: "Korean Language", value: "exp2" },
    { label: "Accountant", value: "exp3" },
    { label: "Computer Instructor", value: "exp4" },
    { label: "Managing Director", value: "exp5" },
  ];
  const salaryStatusList = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partially Paid", value: "partially paid" },
  ];

  //   usestates
  // USESTATES
  const [name, setName] = useState(individualTutor && individualTutor.name);
  const [email, setEmail] = useState(individualTutor && individualTutor.email);
  const [age, setAge] = useState(individualTutor && individualTutor.age);
  const [qualification, setQualification] = useState(
    individualTutor && individualTutor.qualification
  );
  const [startDate, setStartDate] = useState(
    individualTutor && individualTutor.startDate
  );
  const [salary, setSalary] = useState(
    individualTutor && individualTutor.salary
  );
  const [phoneNumber, setPhoneNumber] = useState(
    individualTutor && individualTutor.phoneNumber
  );
  const [loader, setLoader] = useState(false);

  const [tutorsList, setTutorsList] = useState();

  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const assignedCourses = [];
    const doc = {
      name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber,
      assignedCourses,
      date: new Date(),
    };
    if ((name, email, age, qualification, startDate, salary, phoneNumber)) {
      let list = tutors;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "tutors",
        doc,
      })
        .then((result) => {
          setTutors(list);
          setRefresh(true);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 2. closing course modal
  const handleClose = () => {
    setName("");
    setEmail("");
    setAge("");
    setQualification("");
    setStartDate("");
    setSalary("");
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = () => {
    const doc = {
      name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber,
    };
    if ((name, email, age, qualification, startDate, salary, phoneNumber)) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "tutors",
        updatedTo: doc,
        id: individualTutor._id,
      })
        .then((result) => {
          setRefresh(true);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 4. on deleting course
  const handleOnClickDelete = () => {
    setLoader(true);
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualTutor._id}&collectionName=tutors`,
    })
      .then((result) => {
        setRefresh(true);
        setLoader(false);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <TutorModalPresentational
      show={show}
      setShow={setShow}
      tutors={tutors}
      setTutors={setTutors}
      individualTutor={individualTutor}
      courseModalType={courseModalType}
      setRefresh={setRefresh}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      qualificationList={qualificationList}
      setQualification={setQualification}
      handleClose={handleClose}
      handleOnClickSubmit={handleOnClickSubmit}
      handleOnClickUpdate={handleOnClickUpdate}
      handleOnClickDelete={handleOnClickDelete}
      name={name}
      setAge={setAge}
      setStartDate={setStartDate}
    ></TutorModalPresentational>
  );
}
