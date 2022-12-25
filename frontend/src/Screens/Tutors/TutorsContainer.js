import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Pagination from "react-js-pagination";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";

import { IndividualTutor } from "./IndividualTutor";
import { TutorModal } from "./TutorModal/TutorModalContainer";
import { SearchComponentC } from "../../components/SearchComponent/SearchComponent.c";
import { FilterC } from "../../components/Filter/Filter.c";

export const TutorsContainer = () => {
// data
const aggregateArray = [
  {
    $lookup: {
      from: "tutors",
      localField: "tutorId",
      foreignField: "_id",
      as: "tutor",
    },
  },
];
const wantedDBList = [
  { collectionName: "courses",collectionTitleValue:'courseName', title: "Course", titleValue: "courseName" },
  { collectionName: "shifts", collectionTitleValue:'name',title: "Shifts", titleValue: "shift" },
];
const wantedLocalList = ['paymentStatus','months','year', 'startDate'];

  // use states
  const [tutors, setTutors] = useState();
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [unModifiableOrignalList, setUnModifiableOrignalList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  // use effects
  useEffect(() => {
    getOneModalTotalCount({
      url: "/api/commonRoute/getOneModalTotalCount",
      collectionName: "tutors",
    })
      .then((result) => {
        console.log("total documents: ", result);
        setTotalPages(result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    refresh &&
      getAllData({
        url: "/api/commonRoute/getData",
        collectionName: "tutors",
        pageNumber: currentPage,
        nPerPage: 100,
      })
        .then((result) => {
          setUnModifiableOrignalList(result);
          setTutors(result);
          setRefresh(false);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [refresh]);

  useEffect(() => {
    getAllData({
      url: "/api/commonRoute/getData",
      collectionName: "tutors",
      pageNumber: currentPage,
      nPerPage: 100,
    })
      .then((result) => {
        setTutors(result);
        setRefresh(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);


  const closeFilter = () => {
    setShowFilter(false); 
  };

  console.log("Tutors: ", tutors)
  return (
    <div className="tutors">
      {showModal && (
        <TutorModal
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
        {tutors && (
          <SearchComponentC
            originalList={unModifiableOrignalList}
            setOriginalList={setTutors}
          ></SearchComponentC>
        )}
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
      <div className="filter__div">
        <FilterC
          aggregateArray={aggregateArray}
          returnAs="tutor"
          collectionName="assignedCourses"
          setResult={setTutors}
          wantedDBList={wantedDBList}
          wantedLocalList={wantedLocalList}
          filterType="normal"
        ></FilterC>
      </div>
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
