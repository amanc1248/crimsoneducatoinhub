import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  deleteData,
  getCourseData,
  insertData,
  updateData,
} from "../../../actions/homeActions";

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

export function TutorModalPresentational({
  show,
  setShow,
  tutors,
  setTutors,
  individualTutor,
  courseModalType,
  setRefresh,
  handleClose,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  age,
  setAge,
  qualificationList,
  setQualification,
  startDate,
  setStartDate,
  salary,
  setSalary,
  handleOnClickSubmit,
  handleOnClickUpdate,
  handleOnClickDelete,
  name
}) {
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {courseModalType === "Add"
              ? "Add Tutor"
              : courseModalType === "Update"
              ? "Update Tutor"
              : "Delete Tutor"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new__feature__request__form">
            <div className="firstname__lastname row">
              {/* 1. First name */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="name">Name</label>
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Enter First name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>

              {/* 2. Email  */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="email">Email</label>
                <input
                  class="form-control"
                  id="email"
                  name="email"
                  rows="4"
                  cols="50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                ></input>
              </div>
            </div>

            {/* Courses */}

            <div className="learning__form__group">
              <label for="course">Phone Number</label>
              <input
                class="form-control"
                id="phnNumber"
                name="phnNumber"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="number"
              ></input>
            </div>
            <div class="learning__form__group">
              <label for="name">Age</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Your Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
              ></input>
            </div>

            <div className="learning__form__group">
              <label for="qualification">Qualification</label>
              <Select
                placeholder="Select qualification"
                className="select__learning__module"
                options={qualificationList}
                // value={individualTutor.qualification}
                onChange={(e) => {
                  setQualification(e.label);
                }}
              />
            </div>

            <div className="learning__form__group row">
              {/* 3. Start Date  */}
              <div class="learning__form__group col-lg-12 col-12">
                <label for="startDate">Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  name="startDate"
                  rows="4"
                  cols="50"
                  placeholder="Select starting date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-close" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={
              courseModalType === "Add"
                ? handleOnClickSubmit
                : courseModalType === "Update"
                ? handleOnClickUpdate
                : handleOnClickDelete
            }
          >
            {courseModalType}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
