import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../styles/screens/home.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../../styles/screens/home.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Table from "react-bootstrap/Table";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export const PaymentFilterP = ({
  filteringObject,
  changeFilterState,
  applyFilter,
  showFilterModal,
  setShowFilterModal,
  results,
}) => {
  return (
    <>
      <div>
        <button
          className="filter__button"
          onClick={() => {
            setShowFilterModal(true);
          }}
        >
          Filter
          <FilterAltIcon></FilterAltIcon>
        </button>
      </div>
      <Modal
        show={showFilterModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Filter contents</Modal.Title>
          <button>
            <RestartAltIcon></RestartAltIcon>Reset
          </button>
        </Modal.Header>
        <Modal.Body>
          {filteringObject
            ? filteringObject.map((obj, index) => {
                return (
                  <div key={index}>
                    <h5>{obj.title}</h5>
                    <div className="filters__div">
                      {obj.filters.map((filterObj, fbi) => {
                        return (
                          <div key={fbi} className="filter__div__single">
                            <label
                              htmlFor={filterObj.id}
                              style={{ marginRight: "5px" }}
                            >
                              {filterObj.value}
                            </label>
                            <input
                              type="checkbox"
                              onChange={() => {
                                changeFilterState(filterObj.id);
                              }}
                              checked={filterObj.checked}
                              id={filterObj.id}
                              name={filterObj.label}
                              value={filterObj.value}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <br />
                  </div>
                );
              })
            : "Loading..."}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShowFilterModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              applyFilter();
            }}
          >
            Apply Filter
          </button>
        </Modal.Footer>
      </Modal>
      {results.length > 0 && (
          <div className="students__inside">
            <Table
              hover
              size="sm"
              className="table__list"
              id="payments__filter__table"
              responsive
            >
              <thead>
                <tr>
                  <th>Tutor Name</th>
                  <th>Course Name</th>
                  <th>Course Fee</th>
                  <th>Salary Amount</th>
                  <th>Salary Percentage</th>
                  <th>Paid Amount</th>
                  <th>Remaining Amount</th>
                  <th>Shifts</th>
                  <th>Final Amounts</th>
                </tr>
              </thead>
              <tbody>
                {results.map((assignedCourse, index) => {
                  return (
                    <tr className="payments__table__list">
                      <td>{assignedCourse.tutorName}</td>
                      <td>{assignedCourse.courseName}</td>
                      <td>{assignedCourse.courseFee}</td>
                      <td>Rs: {assignedCourse.salaryAmount}</td>
                      <td>{assignedCourse.salaryPercentage} %</td>
                      <td>Rs: {assignedCourse.padeAmount}</td>
                      <td>Rs: {assignedCourse.remainingAmount}</td>
                      <td>
                        {assignedCourse.shifts.map((shift, shiftIndex) => {
                          return (
                            <div>
                              <span>{shift.value}</span>
                            </div>
                          );
                        })}
                      </td>
                      <td>
                        <Table
                          striped
                          hover
                          size="sm"
                          className="final__amounts__table"
                          responsive
                        >
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Amount Collected</th>
                              <th>Amount to pay</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.keys(assignedCourse.month).length > 0
                              ? Object.keys(assignedCourse.month).map(
                                  (month, monthIndex) => {
                                    let amountCollected = 0;
                                    assignedCourse.month[month].map(
                                      (studentPayment, studentPaymentIndex) => {
                                        amountCollected += parseInt(
                                          studentPayment.amount
                                        );
                                      }
                                    );
                                    return (
                                      <tr>
                                        <td>
                                          <span>{month}</span>
                                        </td>
                                        <td>
                                          <span>Rs: {amountCollected}</span>
                                        </td>
                                        <td>
                                          <span>
                                            Rs:{" "}
                                            {(amountCollected *
                                              assignedCourse.salaryPercentage) /
                                              100}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  }
                                )
                              : "Rs: 0"}
                          </tbody>
                        </Table>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>

          <ReactHTMLTableToExcel
            id="payments__filter__table"
            className="download-table-xls-button"
            table="payments__filter__table"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
          </div>
      )}
    </>
  );
};
