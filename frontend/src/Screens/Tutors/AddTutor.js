import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { insertData } from "../../actions/homeActions";

export function AddTutor({ show, setShow, tutors, setTutors }) {
  // data
  const courseList = [
    {
      label: "IELTS Class",
      value: "IELTS",
    },
    {
      label: "PTE Class",
      value: "PTE",
    },
    {
      label: "JAPNESE Class",
      value: "JAPNENSE",
    },
    {
      label: "KOREAN Class",
      value: "KOREAN",
    },
    {
      label: "COMPUTER Class",
      value: "COMPUTER",
    },
  ];

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
  const [courses, setCourses] = useState();
  const [age, setAge] = useState();
  const [qualification, setQualification] = useState();
  const [startDate, setStartDate] = useState();
  const [salary, setSalary] = useState();
  const [loader, setLoader] = useState(false);

  // functions
  const handleOnClickSubmit = () => {
    const date = new Date();
    const doc = {
      name,
      email,
      courses,
      age,
      qualification,
      startDate,
      salary,
      date,
    };
    console.log(courses);
    if (
      name &&
      email &&
      courses &&
      age &&
      qualification &&
      startDate &&
      salary
    ) {
      let list = tutors;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "tutors",
        doc,
      })
        .then((result) => {
          list.unshift(doc);
          setTutors(list);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };
  const handleClose = () => setShow(false);

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
