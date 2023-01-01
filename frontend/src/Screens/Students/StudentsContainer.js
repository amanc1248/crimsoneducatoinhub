import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { IndividualStudent } from "./IndividualStudent";
import Pagination from "react-js-pagination";
import { StudentModal } from "./StudentModal/StudentModalContainer";
import { SearchComponentC } from "../../components/SearchComponent/SearchComponent.c";
import { FilterC } from "../../components/Filter/Filter.c";
import { Loader } from "../../components/Loader";

const aggregateArray = [
  {
    $lookup: {
      from: "students",
      localField: "studentId",
      foreignField: "_id",
      as: "student",
    },
  },
];
const wantedDBList = [
  {
    collectionName: "courses",
    collectionTitleValue: "courseName",
    title: "Course",
    titleValue: "courseName",
  },
  {
    collectionName: "shifts",
    collectionTitleValue: "name",
    title: "Shifts",
    titleValue: "shift",
  },
];
const wantedLocalList = ["paymentStatus", "months", "year", "startDate"];
export const StudentsContainer = () => {
  // use states
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [unModifiableOrignalList, setUnModifiableOrignalList] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  // use effects
  useEffect(() => {
    getOneModalTotalCount({
      url: "/api/commonRoute/getOneModalTotalCount",
      collectionName: "students",
    })
      .then((result) => {
        console.log("total documents: ", result);
        setTotalPages(result);
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (refresh) {
      setLoading(true);
      getAllData({
        url: "/api/commonRoute/getData",
        collectionName: "students",
        pageNumber: currentPage,
        nPerPage: 100,
      })
        .then((result) => {
          setUnModifiableOrignalList(result);
          setStudents(result);
          setRefresh(false);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [refresh]);

  useEffect(() => {
    setLoading(true);
    getAllData({
      url: "/api/commonRoute/getData",
      collectionName: "students",
      pageNumber: currentPage,
      nPerPage: 100,
    })
      .then((result) => {
        setStudents(result);
        setRefresh(false);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  // close filter
  const closeFilter = () => {
    setShowFilter(false);
  };
  return (
    <div className="students">
      {showModal && (
        <StudentModal
          setShow={setShowModal}
          students={students}
          setStudents={setStudents}
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
          Add Student
        </Button>
        {students && (
          <SearchComponentC
            originalList={unModifiableOrignalList}
            setOriginalList={setStudents}
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
      <div className="filter__div">
        <FilterC
          aggregateArray={aggregateArray}
          returnAs="student"
          collectionName="enrolledCourses"
          setResult={setStudents}
          wantedDBList={wantedDBList}
          wantedLocalList={wantedLocalList}
          filterType="normal"
        ></FilterC>
      </div>
      {loading ? (
        <Loader></Loader>
      ) : (
        <div className="students__inside">
          <Table striped hover size="sm" className="table__list" responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>DOB</th>

                <th>Your Phone Number</th>
                <th>Qualification</th>
                <th>Address</th>
                <th>Parents name</th>
                <th>Parent Phone Number</th>
                <th>Counsellor Name</th>
                <th>Additional Amount</th>
                <th>Additional Amount Details</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student, index) => {
                  return (
                    <IndividualStudent
                      student={student}
                      index={index}
                      key={index}
                      setRefresh={setRefresh}
                    />
                  );
                })}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};
