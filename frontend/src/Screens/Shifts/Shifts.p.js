import React from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../../styles/screens/home.css";
import Pagination from "react-js-pagination";
import { SearchComponentC } from "../../components/SearchComponent/SearchComponent.c";
import { IndividualShiftC } from "./IndividualShift/IndividualShift.c";
import { ShiftModalContainer } from "./ShiftModal/ShiftModa.c";

export const ShiftsPresentational = ({
  showModal,
  setShowModal,
  shifts,
  setShifts,
  setRefresh,
  unModifiableOrignalList,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="students">
      {showModal && (
        <ShiftModalContainer
          setShow={setShowModal}
          shifts={shifts}
          setShifts={setShifts}
          courseModalType="Add"
          setRefresh={setRefresh}
        />
      )}
      <div className="action__buttons">
        <Button
          variant="primary"
          size="sm"
          onClick={() => {
            setShowModal(true);
          }}
        >
          Add Shift
        </Button>
        {shifts && (
          <SearchComponentC
            originalList={unModifiableOrignalList}
            setOriginalList={setShifts}
          ></SearchComponentC>
        )}
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          activePage={currentPage}
          itemsCountPerPage={100}
          totalItemsCount={totalPages}
          pageRangeDisplayed={3}
          onChange={(page) => {
            setCurrentPage(page);
          }}
        />
      </div>
      <br />
      <div className="students__inside">
        <Table striped hover size="sm" className="table__list">
          <thead>
            <tr>
              <th>#</th>
              <th>Shift Name</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shifts &&
              shifts.map((shift, index) => {
                return (
                  <IndividualShiftC
                    shift={shift}
                    index={index}
                    key={index}
                    setRefresh={setRefresh}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};
