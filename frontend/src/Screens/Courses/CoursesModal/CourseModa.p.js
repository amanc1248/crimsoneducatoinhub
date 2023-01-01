import React from "react";
import Modal from "react-bootstrap/Modal";
import { Loader } from "../../../components/Loader";
import Select from "react-select";

export function CourseModalPresentational({
  course,
  setCourse,
  courseModalType,
  handleClose,
  handleOnClickSubmit,
  handleOnClickUpdate,
  handleOnClickDelete,
  loader,

  typeClassList,
}) {
  return (
    <>
      <Modal
        show={true}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
                value={course.courseName}
                onChange={(e) => {
                  setCourse((prevState) => {
                    return {
                      ...prevState,
                      courseName: e.target.value,
                    };
                  });
                }}
              ></input>
            </div>

            <div class="learning__form__group">
              <label for="typeClass">Class</label>
              <Select
                placeholder="Select Class"
                className="select__learning__module"
                options={typeClassList}
                value={{ label: course.typeClass, value: course.typeClass }}
                onChange={(e) => {
                  setCourse((prevState) => {
                    return {
                      ...prevState,
                      typeClass: e.label,
                    };
                  });
                }}
              />
            </div>

            {/* 2. course duration  */}
            <div class="learning__form__group ">
              <label for="email">Course Duration (Days)</label>
              <input
                class="form-control"
                id="courseDuration"
                name="courseDuration"
                rows="4"
                cols="50"
                placeholder="Enter Time Period"
                value={course.courseDuration}
                onChange={(e) => {
                  setCourse((prevState) => {
                    return {
                      ...prevState,
                      courseDuration: e.target.value,
                    };
                  });
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
                value={course.courseFee}
                onChange={(e) => {
                  setCourse((prevState) => {
                    return {
                      ...prevState,
                      courseFee: e.target.value,
                    };
                  });
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
                value={course.courseDetails}
                onChange={(e) => {
                  setCourse((prevState) => {
                    return {
                      ...prevState,
                      courseDetails: e.target.value,
                    };
                  });
                }}
              ></textarea>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loader ? (
            <Loader></Loader>
          ) : (
            <div>
              <button className="btn btn-close" onClick={handleClose}>
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={
                  courseModalType === "Add"
                    ? handleOnClickSubmit
                    : courseModalType === "Update"
                    ? handleOnClickUpdate
                    : handleOnClickDelete
                }
              >
                {courseModalType}
              </button>
            </div>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
