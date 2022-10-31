import React, {useState } from "react";
import Modal from "react-bootstrap/Modal";
import { insertData } from "../../actions/homeActions";

export function CourseModal({ show, setShow, courses, setCourses,individualCourse }) {

  // USESTATES
  const [courseName, setCourseName]                = useState(individualCourse && individualCourse.courseName);
  const [time, setTime]                            = useState(individualCourse && individualCourse.time);
  const [fee, setFee]                              = useState(individualCourse && individualCourse.fee);
  const [courseDetails, setCourseDetails]          = useState(individualCourse && individualCourse.courseDetails);
  const [loader, setLoader]                        = useState(false);

 

  // functions
  // 1. on adding course
  const handleOnClickSubmit = () => {
    const doc = {
      courseName,
      time,
      fee,
      courseDetails,
    };
    if (courseName && time && fee && courseDetails) {
      let list = courses;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "courses",
        doc,
      })
        .then((result) => {
          list.unshift(doc);
          setCourses(list);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 2. closing course modal
  const handleClose = () => setShow(false);

  console.log("Individual course", individualCourse)
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Add Courses</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new__feature__request__form">
            {/* 1. course name */}
            <div class="learning__form__group ">
              <label for="name">Course Name</label>
              <input
                class="form-control"
                id="name"
                name="name"
                rows="4"
                cols="50"
                placeholder="Enter Course Name"
                value={courseName}
                onChange={(e) => {
                  setCourseName(e.target.value);
                }}
              ></input>
            </div>

            {/* 2. course duration  */}
            <div class="learning__form__group ">
              <label for="email">Course Duration (Months)</label>
              <input
                class="form-control"
                id="email"
                name="email"
                rows="4"
                cols="50"
                placeholder="Enter Time Period"
                value={time}
                onChange={(e) => {
                  setTime(e.target.value);
                }}
                type="number"
              ></input>
            </div>

            {/* Course fee */}
            <div class="learning__form__group">
              <label for="fee">Fee (Rs.)</label>
              <input
                class="form-control"
                id="fee"
                name="fee"
                rows="4"
                cols="50"
                placeholder="Enter Course Fee"
                value={fee}
                onChange={(e) => {
                  setFee(e.target.value);
                }}
                type="number"
              ></input>
            </div>

            <div class="learning__form__group">
              <label for="coursedetails">Course Details</label>
              <textarea
                class="form-control"
                id="coursedetails"
                name="coursedetails"
                rows="6"
                cols="50"
                placeholder="Enter Course Details"
                value={courseDetails}
                onChange={(e) => {
                  setCourseDetails(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleOnClickSubmit}>
            Submit
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
