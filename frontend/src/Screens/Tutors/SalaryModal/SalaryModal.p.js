import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Image } from "cloudinary-react";

import "../../../styles/screens/home.css";
import { LoaderRotatingSquare } from "../../../components/Loader";
import { datesList, monthsList, yearsList } from "../../../Data/StudentsData";
import Select from "react-select";

export const SalaryModalP = ({
  addSalary,
  handleOnShow,
  handleClose,
  handleAddSalary,
  setShowSalaryModal,
  allSalarys,
  handleOnDelete,
  salaryCalculations,
  checkTotalAmountAndSet,
  setTutorSalary,
  tutorSalary,
  chequePhoto,
  setChequePhoto,
  addSalaryLoading,
  individualTutor,
}) => {
  return (
    <>
      <Modal
        show={true}
        backdrop={true}
        keyboard={false}
        centered={true}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        style={{ background: "white" }}
      >
        <Modal.Header>
          <div>
            <Modal.Title>Salary Details</Modal.Title>
            <div>Name: {individualTutor.name}</div>
            <div>Phone Number: {individualTutor.phoneNumber}</div>
            <div>Address: {individualTutor.address}</div>
          </div>
          <div>
            <div>Total: {salaryCalculations.totalAmount}</div>
            <div>Paid: {salaryCalculations.paidAmount}</div>
            <div>Remaining: {salaryCalculations.remainingAmount}</div>
            {salaryCalculations.totalAmount ===
            salaryCalculations.paidAmount ? (
              <div className="payment__paid">
                {" "}
                <strong>FULLY PAID</strong>{" "}
              </div>
            ) : (
              <div>
                {" "}
                <strong className="payment__not__paid">
                  NOT FULLY PAID
                </strong>{" "}
              </div>
            )}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover size="sm" className="table__list" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Year</th>
                <th>Month</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Payment Details</th>
                <th>Cheque Photo</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allSalarys &&
                allSalarys.map((salary, index) => {
                  return (
                    <tr key={salary.salaryId}>
                      <td>{index + 1}</td>
                      <td>{salary.year}</td>
                      <td>{salary.month}</td>
                      <td>{salary.date}</td>
                      <td>{salary.amount}</td>
                      <td>{salary.salaryDetails}</td>
                      <td>
                        {" "}
                        <Image
                          cloudName="gaurabcloudinary"
                          publicId={salary.filename}
                          variant="top"
                          width="50%"
                          height="70px"
                        />
                        {/* {salary.filename} */}
                      </td>
                      <td>
                        {" "}
                        <Button
                          variant="danger"
                          size="sm"
                          className="button__size"
                          onClick={() => {
                            handleOnDelete(salary.salaryId);
                          }}
                        >
                          Delete
                        </Button>{" "}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          {salaryCalculations.totalAmount !== salaryCalculations.paidAmount && (
            <Button
              variant="success"
              size="sm"
              className="add__button__size"
              onClick={handleOnShow}
            >
              + Add Salary
            </Button>
          )}
          {addSalary && (
            <div>
              <div className="adding__course__div">
                {/* 1. payment date*/}
                <div>
                  <label for="paymentYear">Year</label>
                  <Select
                    placeholder="Select Year"
                    className="selecting__divs"
                    options={yearsList}
                    onChange={(e) => {
                      setTutorSalary((prevState) => {
                        return {
                          ...prevState,
                          year: e.value,
                        };
                      });
                    }}
                  />
                </div>

                {/* 2. Start Month  */}
                <div class="learning__form__group ">
                  <label for="month">Month</label>
                  <Select
                    placeholder="Select Month"
                    className="selecting__divs"
                    options={monthsList}
                    onChange={(e) => {
                      setTutorSalary((prevState) => {
                        return {
                          ...prevState,
                          month: e.value,
                        };
                      });
                    }}
                  />
                </div>

                {/* 3. Start Date  */}
                <div class="learning__form__group ">
                  <label htmlFor="">Date</label>
                  <Select
                    placeholder="Select Date"
                    className="selecting__divs"
                    options={datesList}
                    onChange={(e) => {
                      setTutorSalary((prevState) => {
                        return {
                          ...prevState,
                          date: e.value,
                        };
                      });
                    }}
                  />
                </div>
              </div>

              <div className="adding__course__div">
                {/* 2. amount*/}
                <div className="payment__date">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    onChange={(e) => {
                      checkTotalAmountAndSet(e.target.value);
                    }}
                    value={tutorSalary.amount}
                  />
                </div>

                {/* 3. payment details*/}
                <div className="payment__date">
                  <label htmlFor="paymentDetails">Payment Details</label>
                  <input
                    type="text"
                    id="paymentDetails"
                    onChange={(e) => {
                      setTutorSalary((prevState) => {
                        return {
                          ...prevState,
                          salaryDetails: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
                <div className="payment__date">
                  <label htmlFor="paymentDetails">Cheque Photo</label>
                  <input
                    type="file"
                    id="paymentDetails"
                    onChange={(e) => {
                      setTutorSalary((prevState) => {
                        return {
                          ...prevState,
                          chequePhoto: e.target.files[0],
                        };
                      });
                    }}
                  />
                </div>
              </div>

              {addSalaryLoading ? (
                <LoaderRotatingSquare></LoaderRotatingSquare>
              ) : (
                <div>
                  <Button
                    variant="btn-close"
                    size="sm"
                    className="add__button__size"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="add__button__size"
                    onClick={handleAddSalary}
                  >
                    Save
                  </Button>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShowSalaryModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowSalaryModal(false);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
