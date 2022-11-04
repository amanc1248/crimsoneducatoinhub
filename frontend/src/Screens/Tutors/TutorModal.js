import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { deleteData, getCourseData, insertData, updateData } from "../../actions/homeActions";

export function TutorModal({ show, setShow, tutors, setTutors,individualTutor, courseModalType, setRefresh }) {

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

  //   usestates
  // USESTATES
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [age, setAge] = useState();
  const [qualification, setQualification] = useState();
  const [startDate, setStartDate] = useState();
  const [salary, setSalary] = useState();
  const [loader, setLoader] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState();

  const [tutorsList, setTutorsList] = useState();

  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const doc = {
      name,
      email,
      age,
      qualification,
      startDate,
      salary,
      phoneNumber,
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
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Tutor</Modal.Title>
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
              ></input>
            </div>
            <div className="learning__form__group">
              <label for="course">Course</label>
              <Select
                placeholder="Select Course"
                className="select__learning__module"
                options={courseList}
                value={
                  courses &&
                  courseList.filter((ug) => courses.includes(ug.value))
                }
                onChange={(course) => {
                  setCourses(course.map((u) => u.value));
                }}
                defaultValue
                isMulti
              />
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
              ></input>
            </div>

            <div className="learning__form__group">
              <label for="qualification">Qualification</label>
              <Select
                placeholder="Select qualification"
                className="select__learning__module"
                options={qualificationList}
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
            <div class="learning__form__group">
              <label for="name">Salary</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Salary"
                value={salary}
                onChange={(e) => {
                  setSalary(e.target.value);
                }}
              ></input>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleOnClickSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
