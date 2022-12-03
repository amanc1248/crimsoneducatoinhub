import React from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";


export function StudentModalPresentational({
  courseModalType,
  setRefresh,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  parentPhoneNumber,
  qualificationList,
  setQualification,
  handleClose,
  handleOnClickSubmit,
  handleOnClickUpdate,
  setParentPhoneNumber,
  handleOnClickDelete,
  name
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
              ? "Add Student"
              : courseModalType === "Update"
              ? "Update Student"
              : "Delete Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new__feature__request__form">
            <div className="firstname__lastname row">
              {/* 1. First name */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="name">Name</label>
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Enter First name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></input>
              </div>

              {/* 2. Email  */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="email">Email</label>
                <input
                  class="form-control"
                  id="email"
                  name="email"
                  rows="4"
                  cols="50"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                ></input>
              </div>
            </div>
            <div className="parent_your_phone row">
              {/* 1. Your Phone Number */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="yourPhnNumber">Your Phone Number</label>
                <input
                  class="form-control"
                  id="yourPhnNumber"
                  name="yourPhnNumber"
                  rows="4"
                  cols="50"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                  type="number"
                ></input>
              </div>

              {/* 2. Parent Phone Number  */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="parentPhnNumber">Parent Phone Number</label>
                <input
                  class="form-control"
                  id="parentPhnNumber"
                  name="parentPhnNumber"
                  rows="4"
                  cols="50"
                  placeholder="Enter your parent phone number"
                  value={parentPhoneNumber}
                  onChange={(e) => {
                    setParentPhoneNumber(e.target.value);
                  }}
                  type="number"
                ></input>
              </div>
            </div>

            <div className="learning__form__group">
              <label for="qualification">Qualification</label>
              <Select
                placeholder="Select qualification"
                className="select__learning__module"
                options={qualificationList}
                onChange={(e) => {
                  setQualification(e.label);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
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
        </Modal.Footer>
      </Modal>
    </>
  );
}
