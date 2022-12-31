import React, { useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import { getAllData, updateData } from "../../actions/homeActions";
import Pagination from "react-js-pagination";
import Button from "react-bootstrap/esm/Button";
import { Document, Page, Text } from "react-pdf";

const Users = () => {
  const [userDetails, setUserDetails] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [permissions, setPermissions] = useState({});

  function handleChange(event) {
    const { name, checked } = event.target;
    setPermissions((prevValues) => ({
      ...prevValues,
      [name]: checked,
    }));
  }

  useEffect(() => {
    refresh &&
      getAllData({
        url: "/api/commonRoute/getData",
        collectionName: "users",
        pageNumber: currentPage,
        nPerPage: 100,
      })
        .then((result) => {
          setUserDetails(result);
          setRefresh(false);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [refresh]);

  const handleUpdate = (_id) => {
    const doc = {
      permissions,
    };
    if (permissions) {
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "users",
        updatedTo: doc,
        id: _id,
      }).then((result) => {
        // console.log(result);
        alert("Updated Successfully");
      });
    }
  };

  const pdfRef = useRef(null);

  function handleDownload() {
    const pdf = pdfRef.current.pdf;
    pdf.pageSize("A4"); // Set the page size to A4
    pdf.pageMargins([30, 30, 30, 30]); // Set the page margins to 30pt
    pdf.fontSize(12); // Set the font size to 12pt
    pdf.text("My Custom PDF", { align: "center" }); // Add a title to the PDF
    pdf.moveDown(); // Move the cursor down by one line
    pdf.text("This is a custom PDF file created with react-pdf", {
      align: "center",
    }); // Add some text to the PDF
    pdf.save("document.pdf");
  }
  return (
    <div>
      THIS IS USERS
      <div>
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
      <div>
        <Table striped hover size="sm" className="table__list">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Permission</th>
            </tr>
          </thead>
          <tbody>
            {userDetails.map((userDetail, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{userDetail.name}</td>
                    <td>{userDetail.email}</td>
                    <td>
                      {userDetail?.role &&
                        userDetail.role.map((data) => {
                          return (
                            <>
                              <label key={data}>
                                <input
                                  type="checkbox"
                                  name={data}
                                  checked={permissions[data]}
                                  onChange={handleChange}
                                />
                                {data}
                              </label>
                            </>
                          );
                        })}
                    </td>
                    <td>
                      <Button onClick={() => handleUpdate(userDetail._id)}>
                        Update
                      </Button>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </Table>
      </div>
      <div>
        <Document ref={pdfRef}>
          <Page>THIS IS NEW PDF</Page>
        </Document>
        <button onClick={handleDownload}>Download PDF</button>
      </div>
    </div>
  );
};

export default Users;
