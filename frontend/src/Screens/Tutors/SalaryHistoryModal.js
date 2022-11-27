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
  getOneModalAllDocuments,
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
  //useEffects

  useEffect(() => {
    getOneModalAllDocuments({
      url: "/api/commonRoute/getAllDocuments",
      collectionName: "salary",
    })
      .then((result) => {
        setShowSalaryDetails(result);
      })
      .catch((e) => console.log(e));
  }, []);
  //   usestates
  // USESTATES
  const [paySalary, setPaySalary] = useState(false);
  const [chequeNumber, setChequeNumber] = useState();
  const [payDate, setPayDate] = useState();

  const [tutorsSalary, setTutorsSalary] = useState([]);

  const [showSalaryDetails, setShowSalaryDetails] = useState();

  const [loader, setLoader] = useState(false);

  // functions
  // 1. on paying salary
  const handleOnPaySalary = () => {
    const doc = {
      chequeNumber,
      payDate,
    };
    if ((chequeNumber, payDate)) {
      setLoader(true);
      setTutorsSalary((prevState) => {
        return [...prevState, doc];
      });

      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "salary",
        doc,
      })
        .then((result) => {
          setRefresh(true);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
      console.log(doc);
    }
  };

  const hidePaySalary = () => {
    setPaySalary(false);
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
              {showSalaryDetails &&
                showSalaryDetails.map((salary, index) => {
                  return (
                    <tr key={salary._id}>
                      <td>{index + 1}</td>
                      <td>{salary.chequeNumber}</td>
                      <td>{salary.payDate}</td>

                      <td>
                        <Button
                          variant="success"
                          size="sm"
                          className="button__size ml-4"
                        >
                          Update
                        </Button>
                      </td>
                    </tr>
                  );
                })}
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
          <div>
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
                        setChequeNumber(e.target.value);
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
                        setPayDate(e.target.value);
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
                <Button
                  variant="btn-close"
                  size="sm"
                  className="add__button__size"
                  onClick={hidePaySalary}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  className="add__button__size"
                  onClick={handleOnPaySalary}
                >
                  Save
                </Button>
              </div>
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-close" onClick={handleClose}>
            Cancel
          </button>
          <button className="btn btn-primary">Save</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
