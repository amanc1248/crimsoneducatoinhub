import React, { useState } from "react";
import {
  deleteData,
  insertData,
  updateData,
} from "../../../actions/homeActions";

import { StudentModalPresentational } from "./StudentModalPresentational";

export function StudentModal({
  show,
  setShow,
  students,
  setStudents,
  individualStudent,
  courseModalType,
  setRefresh,
}) {
  const qualificationList = [
    { label: "SLC", value: "slc" },
    { label: "+2", value: "+2" },
    { label: "Bachelors", value: "bachelors" },
  ];
  const feeStatusList = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partially Paid", value: "partially paid" },
  ];

  const typeClassList = [
    {
      label: "Special Class",
      value: "special",
    },
    {
      label: "Normal Class",
      value: "normal",
    },
  ];

  //   usestates
  // USESTATES
  const [name, setName] = useState(individualStudent && individualStudent.name);
  const [email, setEmail] = useState(
    individualStudent && individualStudent.email
  );
  // const [age, setAge] = useState(individualStudent && individualStudent.age);
  const [qualification, setQualification] = useState(
    individualStudent && individualStudent.qualification
  );
  const [phoneNumber, setPhoneNumber] = useState(
    individualStudent && individualStudent.phoneNumber
  );
  const [parentPhoneNumber, setParentPhoneNumber] = useState(
    individualStudent && individualStudent.parentPhoneNumber
  );
  const [loader, setLoader] = useState(false);

  const [dob, setDOB] = useState(individualStudent && individualStudent.dob);
  const [parentsName, setParentsName] = useState(
    individualStudent && individualStudent.parentsName
  );

  const [typeClass, setTypeClass] = useState(
    individualStudent && individualStudent.typeClass
  );

  const [address, setAddress] = useState(
    individualStudent && individualStudent.address
  );
  const [counsellorName, setCounsellorName] = useState(
    individualStudent && individualStudent.counsellorName
  );

  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const doc = {
      name,
      email,

      qualification,
      phoneNumber,
      parentPhoneNumber,
      dob,
      parentsName,
      typeClass,
      address,
      counsellorName,
      date: new Date(),
    };
    if (
      (name,
      email,
      dob,
      qualification,
      phoneNumber,
      parentPhoneNumber,
      parentsName,
      typeClass,
      address,
      counsellorName)
    ) {
      let list = students;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "students",
        doc,
      })
        .then((result) => {
          setStudents(list);
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
    setTypeClass("");
    setParentsName("");
    setDOB("");
    setParentPhoneNumber("");
    setQualification("");
    setPhoneNumber("");
    setCounsellorName("");
    setAddress("");
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = () => {
    const doc = {
      name,
      email,
      dob,
      qualification,
      phoneNumber,
      parentPhoneNumber,
      parentsName,
      typeClass,
      address,
      counsellorName,
    };
    if (
      (name,
      email,
      dob,
      qualification,
      phoneNumber,
      parentPhoneNumber,
      parentsName,
      typeClass,
      address,
      counsellorName)
    ) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "students",
        updatedTo: doc,
        id: individualStudent._id,
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
      url: `/api/commonRoute/deleteData?id=${individualStudent._id}&collectionName=students`,
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
    <StudentModalPresentational
      show={show}
      setShow={setShow}
      students={students}
      setStudents={setStudents}
      individualStudent={individualStudent}
      courseModalType={courseModalType}
      setRefresh={setRefresh}
      setName={setName}
      email={email}
      setEmail={setEmail}
      phoneNumber={phoneNumber}
      setPhoneNumber={setPhoneNumber}
      parentPhoneNumber={parentPhoneNumber}
      qualificationList={qualificationList}
      setQualification={setQualification}
      dob={dob}
      setDOB={setDOB}
      parentsName={parentsName}
      setParentsName={setParentsName}
      typeClassList={typeClassList}
      setTypeClass={setTypeClass}
      address={address}
      setAddress={setAddress}
      counsellorName={counsellorName}
      setCounsellorName={setCounsellorName}
      handleClose={handleClose}
      handleOnClickSubmit={handleOnClickSubmit}
      handleOnClickUpdate={handleOnClickUpdate}
      setParentPhoneNumber={setParentPhoneNumber}
      handleOnClickDelete={handleOnClickDelete}
      name={name}
    ></StudentModalPresentational>
  );
}
