import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { getCourseData, insertData } from "../../actions/homeActions";

export function AddStudent({ show, setShow, students, setStudents }) {
  useEffect(() => {
    getCourseData({
      url: "/api/commonRoute/getData",
      collectionName: "courses",
    })
      .then((result) => {
        let list = [];

        result.map((course) => {
          list.push({ label: course.courseName, value: course.courseName });
          setCourseList(list);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // data
  // const courseList = [
  //   {
  //     label: "IELTS Class",
  //     value: "IELTS",
  //   },
  //   {
  //     label: "PTE Class",
  //     value: "PTE",
  //   },
  //   {
  //     label: "JAPNESE Class",
  //     value: "JAPNENSE",
  //   },
  //   {
  //     label: "KOREAN Class",
  //     value: "KOREAN",
  //   },
  //   {
  //     label: "COMPUTER Class",
  //     value: "COMPUTER",
  //   },
  // ];

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

  //   usestates
  // USESTATES
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [course, setCourse] = useState();
  const [qualification, setQualification] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [feeStatus, setFeeStatus] = useState();
  const [loader, setLoader] = useState(false);
  const [courseList, setCourseList] = useState();

  // functions
  const handleOnClickSubmit = () => {
    const doc = {
      name,
      email,
      course,
      qualification,
      startDate,
      endDate,
      feeStatus,
    };
    if (
      name &&
      email &&
      course &&
      qualification &&
      startDate &&
      endDate &&
      feeStatus
    ) {
      let list = students;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "students",
        doc,
      })
        .then((result) => {
          list.unshift(doc);
          setStudents(list);
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
          <Modal.Title>Add Student</Modal.Title>
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

            <div className="learning__form__group">
              <label for="course">Course</label>
              <Select
                placeholder="Select Course"
                className="select__learning__module"
                options={courseList}
                onChange={(e) => {
                  setCourse(e.label);
                }}
                defaultValue
              />
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

            <div className="learning__form__group row">
              {/* 3. End Date  */}
              <div class="learning__form__group col-lg-12 col-12">
                <label for="endDate">End Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="endDate"
                  name="endDate"
                  rows="4"
                  cols="50"
                  placeholder="Select ending date"
                  value={endDate}
                  onChange={(e) => {
                    setEndDate(e.target.value);
                  }}
                ></input>
              </div>
            </div>

            <div className="learning__form__group">
              <label for="feeStatus">Fee Status</label>
              <Select
                placeholder="Fee Status"
                className="select__learning__module"
                options={feeStatusList}
                onChange={(e) => {
                  setFeeStatus(e.label);
                }}
              />
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
