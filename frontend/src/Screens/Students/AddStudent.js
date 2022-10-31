import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

import { insertData } from "../../actions/homeActions";
import { Loader } from "../../components/Loader";

export function AddStudent({
  student,
  type,
  shouldShow,
  setFetchAllDataAgain,
  setShouldShow
}) {
  // data
  const coursesList = [
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
    { label: "SLC", value: "slc" },
    { label: "+2", value: "+2" },
    { label: "Bachelors", value: "bachelors" },
  ];
  const feeStatusList = [
    { label: "paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
    { label: "Partially Paid", value: "partially paid" },
  ];

  //   usestates
  // USESTATES
  const [name, setName] = useState(student && student.name);
  const [email, setEmail] = useState(student && student.email);
  const [courses, setCourses] = useState(student && student.courses);
  const [qualification, setQualification] = useState(student && student.qualification);
  const [startDate, setStartDate] = useState(student && student.startDate);
  const [endDate, setEndDate] = useState(student && student.endDate);
  const [feeStatus, setFeeStatus] = useState();
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(shouldShow);

  // functions
  const handleOnClickAdd = () => {
    const date = new Date();
    const doc = {
      name,
      email,
      courses,
      qualification,
      startDate,
      endDate,
      feeStatus,
      date
    };
    console.log(doc)

    if (
      name &&
      email &&
      courses &&
      qualification &&
      startDate &&
      endDate &&
      feeStatus
    ) {
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "students",
        doc,
      })
        .then((result) => {
          setLoader(false);
          setFetchAllDataAgain(true);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }else{
      toast.error('Fill the required fields', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  };

  const handelOnClickUpdate = ()=>{}
  const handleOnClickDelete = ()=>{}

  const handleClose = () => {
    setShouldShow(false);
    setName('');
    setCourses('');
    setEmail('');
    setEndDate('');
    setFeeStatus('');
    setStartDate('');
    setQualification('');
  };

  return (
    <>
      {loader && <Loader />}
      <ToastContainer />
      <Modal
        show={shouldShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {type === "add" && "Add Student"}
            {type === "update" && "Update Student"}
            {type === "delete" && "Delete Student"}
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
                ></input>
              </div>
            </div>

            <div className="learning__form__group">
              <label for="course">Course</label>
              <Select
                placeholder="Select Course"
                className="select__learning__module"
                options={coursesList}
                value={
                  courses &&
                  coursesList.filter((ug) => courses.includes(ug.value))
                }
                onChange={(course) => {
                  setCourses(course.map((u) => u.value));
                }}
                // defaultValue={coursesList[0]}
                isMulti
              />
            </div>

            <div className="learning__form__group">
              <label for="qualification">Qualification</label>
              <Select
                placeholder="Select qualification"
                className="select__learning__module"
                options={qualificationList}
                // defaultValue={qualificationList[0]}
                onChange={(e) => {
                  setQualification(e.value);
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
                // defaultValue={feeStatusList[0]}
                onChange={(e) => {
                  setFeeStatus(e.value);
                }}
                // value={feeStatusList[0].value}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" size="sm" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={() => {
              handleOnClickAdd();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
