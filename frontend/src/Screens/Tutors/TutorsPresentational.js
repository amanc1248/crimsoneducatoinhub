import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { IndividualTutor } from "./IndividualTutor";
import { TutorModalContainer } from "./TutorModal/TutorModalContainer";


export const TutorsPresentational = ({showModal, setShowModal, tutors, setTutors, setRefresh,currentPage, totalPages, 
setCurrentPage, 
}) => {
  return (
    <div className="tutors">
      {showModal && (
        <TutorModalContainer
          setShow={setShowModal}
          tutors={tutors}
          setTutors={setTutors}
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
          Add Tutor
        </Button>
        <Pagination
          itemClass="page-item"
          linkClass="page-link"
          firstPageText="First"
          lastPageText="Last"
          activePage={currentPage}
          itemsCountPerPage={3}
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
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Age</th>
              <th>Qualification</th>
              <th>Start Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tutors &&
              tutors.map((tutor, index) => {
                return (
                  <IndividualTutor
                    tutor={tutor}
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
