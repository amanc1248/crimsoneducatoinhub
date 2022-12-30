import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";

import "../../../styles/screens/home.css";
export const PaymentModalP = ({
  addPayment,
  handleOnShow,
  handleClose,
  handleAddPayment,
  setShowPaymentModal,
  allPayments,
  handleOnDelete,
  paymentCalculations,
  checkTotalAmountAndSet,
  setStudentPayment,
  studentPayment
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
          <Modal.Title>Payment Details</Modal.Title>
          {console.log(paymentCalculations.totalAmount,  paymentCalculations.paidAmount)}

          <div>
            <div>Total: {paymentCalculations.totalAmount}</div>
            <div>Paid: {paymentCalculations.paidAmount}</div>
            <div>Remaining: {paymentCalculations.remainingAmount}</div>
            {paymentCalculations.totalAmount === paymentCalculations.paidAmount ? <div className="payment__paid"> <strong>FULLY PAID</strong> </div> : <div>  <strong className="payment__not__paid">NOT FULLY PAID</strong> </div>}
          </div>
        </Modal.Header>
        <Modal.Body>
          <Table striped hover size="sm" className="table__list" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Payment Date</th>
                <th>Amount</th>  
                <th>Payment Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allPayments &&
                allPayments.map((payment, index) => {
                  return (
                    <tr key={payment.paymentId}>
                      <td>{index + 1}</td>
                      <td>{payment.paymentDate}</td>
                      <td>{payment.amount}</td>
                      <td>{payment.paymentDetails}</td>
                      <td>
                        {" "}
                        <Button
                          variant="danger"
                          size="sm"
                          className="button__size"
                          onClick={() => {
                            handleOnDelete(payment.paymentId);
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
          {paymentCalculations.totalAmount !== paymentCalculations.paidAmount && <Button
            variant="success"
            size="sm"
            className="add__button__size"
            onClick={handleOnShow}
          >
            + Add Payment
          </Button>}
          {addPayment && (
            <div>
              <div className="adding__course__div">
                {/* 1. payment date*/}
                <div className="payment__date">
                  <label htmlFor="paymentDate">Payment Date</label>
                  <input
                    type="text"
                    id="paymentDate"
                    onChange={(e) => {
                      setStudentPayment((prevState) => {
                        return {
                          ...prevState,
                          paymentDate: e.target.value,
                        };
                      });
                    }}
                  />
                </div>

                {/* 2. amount*/}
                <div className="payment__date">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    id="amount"
                    onChange={(e)=>{checkTotalAmountAndSet(e.target.value)}}
                    value={studentPayment.amount}
                    // onChange={(e) => {
                    //   checkTotalAmount()
                    //   studentPayment.amount = e.target.value;
                    // }}
                  />
                </div>

                {/* 3. payment details*/}
                <div className="payment__date">
                  <label htmlFor="paymentDetails">Payment Details</label>
                  <input
                    type="text"
                    id="paymentDetails"
                    onChange={(e) => {
                      setStudentPayment((prevState) => {
                        return {
                          ...prevState,
                          paymentDetails: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
              </div>

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
                onClick={handleAddPayment}
              >
                Save
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShowPaymentModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              setShowPaymentModal(false);
            }}
          >
            Save
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
