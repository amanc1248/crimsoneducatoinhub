import React, { useState } from "react";
import { toast } from "react-toastify";
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
    { label: "Under SEE", value: "Under SEE" },
    { label: "SEE", value: "SEE" },
    { label: "+2", value: "+2" },
    { label: "Bachelors", value: "bachelors" },
    { label: "Masters", value: "Masters" },
  ];
  const feeStatusList = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partially Paid", value: "partially paid" },
  ];

  //type class lists
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
  const [age, setAge] = useState(individualStudent && individualStudent.age);
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
        checkPermission: "write",
        userId: localStorage.getItem("userId"),
      })
        .then((result) => {
          setStudents(list);
          setRefresh(true);
          setLoader(false);
          handleClose();
          toast.success("Student added successfully", { autoClose: 5000 });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Please add the required fields", { autoClose: 5000 });
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
        checkPermission: "update",
        userId: localStorage.getItem("userId"),
      })
        .then((result) => {
          setRefresh(true);
          setLoader(false);
          handleClose();
          toast.success("Student details updated successfully", {
            autoClose: 5000,
          });
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      toast.error("Please add the required fields", { autoClose: 5000 });
    }
  };
  // 4. on deleting course
  const handleOnClickDelete = () => {
    setLoader(true);
    const userId = localStorage.getItem("userId");
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualStudent._id}&collectionName=students&userId=${userId}`,
    })
      .then((result) => {
        setRefresh(true);
        setLoader(false);
        handleClose();
        toast.success("Student deleted successfully", { autoClose: 5000 });
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
      setQualification={setQualification}
      handleClose={handleClose}
      handleOnClickSubmit={handleOnClickSubmit}
      handleOnClickUpdate={handleOnClickUpdate}
      setParentPhoneNumber={setParentPhoneNumber}
      handleOnClickDelete={handleOnClickDelete}
      name={name}
      qualification={qualification}
      loader={loader}
      typeClass={typeClass}
    ></StudentModalPresentational>
  );
}
