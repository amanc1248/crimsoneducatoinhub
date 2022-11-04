import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import "../../styles/screens/home.css";
import { getAllData, getOneModalTotalCount } from "../../actions/homeActions";
import { IndividualStudent } from "./IndividualStudent";
import { StudentModal } from "./StudentModal";
import Pagination from "react-js-pagination";

export const StudentsContainer = () => {
  // data

  // use states
  const [students, setStudents]                   = useState();
  const [showModal, setShowModal]                           = useState(false);
  const [refresh, setRefresh]                    = useState(true);
  const [totalPages, setTotalPages]              = useState();
  const  [currentPage, setCurrentPage]           = useState(1);

  // use effects
  useEffect(()=>{
    getOneModalTotalCount({url:"/api/commonRoute/getOneModalTotalCount", collectionName:"students"}).then((result)=>{
      console.log("total documents: ", result)
      setTotalPages(result)
    }).catch((e)=>console.log(e));
  },[])

  useEffect(() => {
    refresh && getAllData({ url: "/api/commonRoute/getData", collectionName: "students", pageNumber:currentPage,nPerPage:3 })
      .then((result) => {
        setStudents(result);
        setRefresh(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);

  useEffect(() => {
    getAllData({ url: "/api/commonRoute/getData", collectionName: "students", pageNumber:currentPage, nPerPage:3  })
      .then((result) => {
        setStudents(result);
        setRefresh(false)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [currentPage]);

  return (
    <div className="students">
      {showModal && (<StudentModal
        setShow={setShowModal}
        students={students}
        setStudents={setStudents}
        courseModalType="Add"
        setRefresh={setRefresh}
      />)}
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
              <th>Qualification</th>
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
    </div>
  );
};
