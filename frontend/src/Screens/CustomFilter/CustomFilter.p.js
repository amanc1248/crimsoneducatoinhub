import { FilterC } from "../../components/Filter/Filter.c";

import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { CSVLink, CSVDownload } from "react-csv";
import "../../styles/screens/home.css";
export const CustomFilterP = ({
  customFilterType,
  handleSettingCustomFilterType,
  setResult,
  result,
}) => {
  console.log("Resutl:J ", result);
  const obj = {
    students: {
      aggregateArray: [
        {
          $lookup: {
            from: "studentsCoursePayment",
            localField: "_id",
            foreignField: "enrolledCourseId",
            as: "studentCoursePayment",
          },
        },
        {
          $lookup: {
            from: "students",
            localField: "studentId",
            foreignField: "_id",
            as: "student",
          },
        },
      ],
      wantedDBList: [
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
      ],
      wantedLocalList: ["paymentStatus", "months", "year", "startDate"],
    },
    tutors: {
      aggregateArray: [
        {
          $lookup: {
            from: "tutorsCoursePayment",
            localField: "_id",
            foreignField: "assignedCourseId",
            as: "tutorCoursePayment",
          },
        },
        {
          $lookup: {
            from: "tutors",
            localField: "tutorId",
            foreignField: "_id",
            as: "tutor",
          },
        },
      ],
      wantedDBList: [
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
      ],
      wantedLocalList: [
        "paymentStatus",
        "months",
        "year",
        "startDate",
        "endDate",
      ],
    },
  };
  return (
    <div>
      <div className="customFilter__tabs">
        <div
          className={`individualcustomFilter__tab ${
            customFilterType === "students" && "selected_customFilter__tab"
          }`}
          onClick={() => {
            handleSettingCustomFilterType("students");
          }}
        >
          Students
        </div>
        <div
          className={`individualcustomFilter__tab ${
            customFilterType === "tutors" && "selected_customFilter__tab"
          }`}
          onClick={() => {
            handleSettingCustomFilterType("tutors");
          }}
        >
          Tutors
        </div>
      </div>
      <div className="filter__div">
        {customFilterType === "students" && (
          <FilterC
            aggregateArray={obj.students.aggregateArray}
            returnAs="student"
            collectionName="enrolledCourses"
            setResult={setResult}
            wantedDBList={obj.students.wantedDBList}
            wantedLocalList={obj.students.wantedLocalList}
            filterType="detailed"
          ></FilterC>
        )}
        {customFilterType === "tutors" && (
          <FilterC
            aggregateArray={obj.tutors.aggregateArray}
            returnAs="tutor"
            collectionName="assignedCourses"
            setResult={setResult}
            wantedDBList={obj.tutors.wantedDBList}
            wantedLocalList={obj.tutors.wantedLocalList}
            filterType="detailed"
          ></FilterC>
        )}
      </div>
      {result.length > 0 ? (
        <div className="students__inside">
          <Table
            striped
            hover
            size="sm"
            className="table__list"
            id="detailed-view-filter"
            responsive
          >
            <thead>
              <tr>
                {Object.keys(result[0]).map((value, index) => {
                  return <th>{value.toUpperCase()}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {result.map((value, index) => {
                return (
                  <tr key={index}>
                    {Object.keys(value).map((keyValue, keyValueIndex) => {
                      if (Array.isArray(value[keyValue])) {
                        console.log("I am object");
                        return (
                          value[keyValue].length >0 ? <td>
                            <Table
                              striped
                              hover
                              size="sm"
                              className="table__list"
                              responsive
                            >
                              <thead>
                                <tr>
                                  {Object.keys(value[keyValue][0]).map(
                                    (insideKey, insideKeyIndex) => {
                                      return (
                                        <th className="insidekey">
                                          {insideKey}
                                        </th>
                                      );
                                    }
                                  )}
                                </tr>
                              </thead>
                              <tbody>
                                {value[keyValue].map((a, indexa) => {
                                  return (
                                    <tr>
                                      {Object.keys(a).map((ab, indexab) => {
                                        return <td>{a[ab]}</td>;
                                      })}
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </Table>
                          </td> :"No data"
                        );
                      } else {
                        console.log("NOt an object");
                        return <td key={keyValueIndex}>{value[keyValue]}</td>;
                      }
                    })}
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      ) : (
        "no data"
      )}
      {result.length > 0 && (
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="detailed-view-filter"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      )}
    </div>
  );
};
