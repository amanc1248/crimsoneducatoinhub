import React, {useState } from "react";
import Modal from "react-bootstrap/Modal";
import { deleteData, insertData, updateData } from "../../actions/homeActions";

export function CourseModal({ show, setShow, courses, setCourses,individualCourse, courseModalType, setRefresh }) {

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
      date: new Date()
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
          setCourses(list);
          setRefresh(true);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // 2. closing course modal
  const handleClose = () => {
    setCourseName('');
    setFee('');
    setTime('');
    setCourseDetails('');
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = ()=>{
    const doc = {
      courseName,
      time,
      fee,
      courseDetails,
    };
    if (courseName && time && fee && courseDetails) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "courses",
        updatedTo:doc,
        id:individualCourse._id
      })
        .then((result) => {
          setRefresh(true);
          setLoader(false);
          handleClose();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // 4. on deleting course
  const handleOnClickDelete = ()=>{
    setLoader(true);
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualCourse._id}&collectionName=courses`,
    })
      .then((result) => {
        setRefresh(true);
        setLoader(false);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  console.log("Individual course", individualCourse)
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>
            {courseModalType === "Add"
              ? "Add Courses"
              : courseModalType === "Update"
              ? "Update Course"
              : "Delete Course"}
          </Modal.Title>
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
            onClick={handleClose}
          >
            Cancel
          </button>
          <button className="btn btn-primary" onClick={
            courseModalType==='Add' ? handleOnClickSubmit : courseModalType==='Update' ? handleOnClickUpdate : handleOnClickDelete
          }>
            {courseModalType}
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
