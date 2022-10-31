import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { insertData } from "../../actions/homeActions";

export function AddCourses({ show, setShow, courses, setCourses }) {
  // data
  //   const courseList = [
  //     {
  //       label: "IELTS Class",
  //       value: "IELTS",
  //     },
  //     {
  //       label: "PTE Class",
  //       value: "PTE",
  //     },
  //     {
  //       label: "JAPNESE Class",
  //       value: "JAPNENSE",
  //     },
  //     {
  //       label: "KOREAN Class",
  //       value: "KOREAN",
  //     },
  //     {
  //       label: "COMPUTER Class",
  //       value: "COMPUTER",
  //     },
  //   ];

  //   const qualificationList = [
  //     { label: "Experience 1", value: "exp1" },
  //     { label: "Experience 2", value: "exp2" },
  //     { label: "Experience 3", value: "exp3" },
  //     { label: "Experience 4", value: "exp4" },
  //     { label: "Experience 5", value: "exp5" },
  //     { label: "Experience 6", value: "exp6" },
  //     { label: "Experience 7", value: "exp7" },
  //     { label: "Experience 8", value: "exp8" },
  //     { label: "Experience 9", value: "exp9" },
  //   ];

  //   usestates
  // USESTATES
  const [courseName, setCourseName] = useState();
  const [time, setTime] = useState();
  const [fee, setFee] = useState();
  const [teacher, setTeacher] = useState();
  const [courseDetails, setCourseDetails] = useState();
  const [loader, setLoader] = useState(false);

  // functions
  const handleOnClickSubmit = () => {
    const doc = {
      courseName,
      time,
      fee,
      courseDetails,
    };
    if (courseName && time && fee && courseDetails) {
      let list = courses;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "courses",
        doc,
      })
        .then((result) => {
          list.unshift(doc);
          setCourses(list);
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
          <Modal.Title>Add Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new__feature__request__form">
            {/* 1. course name */}
            <div class="learning__form__group ">
              <label for="name">Course Name</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Course Name"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              ></input>
            </div>

            {/* 2. Time  */}

            <div class="learning__form__group ">
              <label for="email">Time Period</label>
              <input
                class="form-control"
                id="email"
                name="email"
                rows="4"
                cols="50"
                placeholder="Enter Time Period"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
              ></input>
            </div>

            {/* Courses */}

            <div class="learning__form__group">
              <label for="name">Fee</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Course Fee"
                value={fee}
                onChange={(e) => {
                  setFee(e.target.value);
                }}
              ></input>
            </div>

            <div class="learning__form__group">
              <label for="name">Course Details</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Course Details"
                value={courseDetails}
                onChange={(e) => {
                  setCourseDetails(e.target.value);
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
