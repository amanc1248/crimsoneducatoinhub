import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/esm/Table";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  deleteData,
  getCourseData,
  insertData,
  updateData,
} from "../../actions/homeActions";

export function SalaryHistoryModal({
  show,
  setShow,
  tutors,
  setTutors,
  individualTutor,
  courseModalType,
  setRefresh,
}) {
  //   usestates
  // USESTATES
  const [paySalary, setPaySalary] = useState(false);
  //   const [name, setName] = useState(individualTutor && individualTutor.name);
  const [chequeNumber, setChequeNumber] = useState();
  const [payDate, setPayDate] = useState();
  //   const [email, setEmail] = useState(individualTutor && individualTutor.email);
  //   const [age, setAge] = useState(individualTutor && individualTutor.age);
  //   const [qualification, setQualification] = useState(
  //     individualTutor && individualTutor.qualification
  //   );
  //   const [startDate, setStartDate] = useState(
  //     individualTutor && individualTutor.startDate
  //   );
  //   const [salary, setSalary] = useState(
  //     individualTutor && individualTutor.salary
  //   );
  //   const [phoneNumber, setPhoneNumber] = useState(
  //     individualTutor && individualTutor.phoneNumber
  //   );
  const [loader, setLoader] = useState(false);

  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    // const salary = [];
    // const doc = {
    //   chequeNumber,
    //   payDate,
    // };
    // if ((chequeNumber, payDate)) {
    //   //   let list = tutors;
    //   setLoader(true);
    //   insertData({
    //     url: "/api/commonRoute/insertData",
    //     collectionName: "tutors",
    //     doc,
    //   })
    //     .then((result) => {
    //       //   setTutors(list);
    //       //   setRefresh(true);
    //       //   setLoader(false);
    //       //   handleClose();
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //     });
    // }
  };

  // 2. closing course modal
  const handleClose = () => {
    // setName("");
    // setEmail("");
    // setAge("");
    // setQualification("");
    // setStartDate("");
    // setSalary("");
    setShow(false);
  };

  // 3. on updating course
  //   const handleOnClickUpdate = () => {
  //     const doc = {
  //       name,
  //       email,
  //       age,
  //       qualification,
  //       startDate,
  //       salary,
  //       phoneNumber,
  //     };
  //     if ((name, email, age, qualification, startDate, salary, phoneNumber)) {
  //       setLoader(true);
  //       updateData({
  //         url: "/api/commonRoute/updateData",
  //         collectionName: "tutors",
  //         updatedTo: doc,
  //         id: individualTutor._id,
  //       })
  //         .then((result) => {
  //           setRefresh(true);
  //           setLoader(false);
  //           handleClose();
  //         })
  //         .catch((e) => {
  //           console.log(e);
  //         });
  //     }
  //   };

  // 4. on deleting course
  //   const handleOnClickDelete = () => {
  //     setLoader(true);
  //     deleteData({
  //       url: `/api/commonRoute/deleteData?id=${individualTutor._id}&collectionName=tutors`,
  //     })
  //       .then((result) => {
  //         setRefresh(true);
  //         setLoader(false);
  //         handleClose();
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   };

  const showPaySalary = () => {
    setPaySalary(true);
  };

  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Salary History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover size="sm" className="table__list">
            <thead>
              <tr>
                <th>#</th>
                <th>Cheque Number</th>
                <th>Pay Date</th>
                <th>Cheque</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <td>#</td>
              <td>Course Name</td>
              <td>Start Date</td>
              <td>Start Date</td>
              <td>
                <Button variant="success" size="sm" className="button__size">
                  Update
                </Button>
              </td>
            </tbody>
          </Table>
          <Button
            variant="success"
            size="sm"
            className="add__button__size"
            onClick={showPaySalary}
          >
            Pay Salary
          </Button>
          {paySalary && (
            <div>
              <div className="adding__course__div">
                {/* 1. Cheque Number */}
                <div>
                  <label for="chequeNumber">Cheque Number</label>
                  <input
                    type="number"
                    class="form-control selecting__divs"
                    id="chequeNumber"
                    name="chequeNumber"
                    rows="4"
                    cols="50"
                    placeholder="Enter Cheque No."
                    onChange={(e) => {
                      chequeNumber = e.target.value;
                    }}
                  ></input>
                </div>

                {/* 2. Start Date  */}
                <div class="learning__form__group ">
                  <label for="date">Date</label>
                  <input
                    type="date"
                    class="form-control selecting__divs"
                    id="date"
                    name="date"
                    rows="4"
                    cols="50"
                    placeholder="Select starting date"
                    onChange={(e) => {
                      payDate = e.target.value;
                    }}
                  ></input>
                </div>

                {/* 3. End Date  */}
                <div class="learning__form__group ">
                  <label for="photo">Cheque Photo</label>
                  <input
                    type="text"
                    class="form-control selecting__divs"
                    id="photo"
                    name="photo "
                    rows="4"
                    cols="50"
                    placeholder="Select starting date"
                    // onChange={(e) => {
                    //   endDate = e.target.value;
                    // }}
                  ></input>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-close" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleOnClickSubmit}>
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
