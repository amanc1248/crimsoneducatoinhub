import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { deleteData, insertData, updateData } from "../../../actions/homeActions";
import { TutorModalPresentational } from "./TutorModalPresent";

export function TutorModalContainer({ show, setShow, tutors, setTutors,individualTutor, courseModalType, setRefresh }) {

  const qualificationList = [
    { label: "Experience 1", value: "exp1" },
    { label: "Experience 2", value: "exp2" },
    { label: "Experience 3", value: "exp3" },
    { label: "Experience 4", value: "exp4" },
    { label: "Experience 5", value: "exp5" },
    { label: "Experience 6", value: "exp6" },
    { label: "Experience 7", value: "exp7" },
    { label: "Experience 8", value: "exp8" },
    { label: "Experience 9", value: "exp9" },
  ];

  // USESTATES
  const [name, setName] = useState(individualTutor && individualTutor.name);
  const [email, setEmail] = useState(individualTutor && individualTutor.email);
  const [age, setAge] = useState(individualTutor && individualTutor.age);
  const [qualification, setQualification] = useState(individualTutor && individualTutor.qualification);
  const [startDate, setStartDate] = useState(individualTutor && individualTutor.startDate);
  const [salary, setSalary] = useState(individualTutor && individualTutor.salary);
  const [phoneNumber, setPhoneNumber] = useState(individualTutor && individualTutor.phoneNumber);
  const [loader, setLoader] = useState(false);



  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const assignedCourses=[];
    const doc = {
      name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber,
      assignedCourses,
      date: new Date()
    };
    if (name,
      email,
      age,
      qualification,
      startDate,
      salary, phoneNumber) {
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
    setName('');
    setEmail('');
    setAge('');
    setQualification('');
    setStartDate('');
    setSalary('');
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = ()=>{
    const doc = {
      name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber,
    };
    if (name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "tutors",
        updatedTo:doc,
        id:individualTutor._id
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
  }

  // 4. on deleting course
  const handleOnClickDelete = ()=>{
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
  }

  return (
    <TutorModalPresentational
    show={show}
    setShow={setShow}
    tutors={tutors}
    setTutors={setTutors}
    individualTutor={individualTutor}
    courseModalType={courseModalType}
    setRefresh={setRefresh}
    handleClose={handleClose}
    setName={setName}
    email={email}
    setEmail={setEmail}
    phoneNumber={phoneNumber}
    setPhoneNumber={setPhoneNumber}
    age={age}
    setAge={setAge}
    qualificationList={qualificationList}
    setQualification={setQualification}
    startDate={startDate}
    setStartDate={setStartDate}
    salary={salary}
    setSalary={setSalary}
    handleOnClickSubmit={handleOnClickSubmit}
    handleOnClickUpdate={handleOnClickUpdate}
    handleOnClickDelete={handleOnClickDelete}
    ></TutorModalPresentational>
  );
}
