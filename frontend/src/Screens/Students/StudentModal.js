import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { deleteData, getCourseData, insertData, updateData } from "../../actions/homeActions";

export function StudentModal({ show, setShow, students, setStudents,individualStudent, courseModalType, setRefresh }) {

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
  const [name, setName] = useState(individualStudent && individualStudent.name);
  const [email, setEmail] = useState(individualStudent && individualStudent.email);
  const [age, setAge]     = useState(individualStudent && individualStudent.age);
  const [qualification, setQualification] = useState(individualStudent && individualStudent.qualification);
  const [phoneNumber, setPhoneNumber] = useState(individualStudent && individualStudent.phoneNumber);
  const [loader, setLoader] = useState(false);


// functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const doc = {
      name,
      email,
      age,
      qualification,
      phoneNumber,
      date: new Date()
    };
    if (name,
      email,
      age,
      qualification,
      phoneNumber) {
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
    setName('');
    setEmail('');
    setAge('');
    setQualification('');
    setPhoneNumber('');
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = ()=>{
    const doc = {
      name,
      email,
      age,
      qualification,
      phoneNumber,
    };
    if (name,
      email,
      age,
      qualification,
      phoneNumber) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "students",
        updatedTo:doc,
        id:individualStudent._id
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
  }
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
            <div className="learning__form__group">
              <label for="email">Phone Number</label>
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={
            courseModalType==='Add' ? handleOnClickSubmit : courseModalType==='Update' ? handleOnClickUpdate : handleOnClickDelete
          }>
            {courseModalType}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}