import React from "react";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { Loader } from "../../../components/Loader";

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
  name,
  qualification,
  loader,
  dob,
  setDOB,
  parentsName,
  setParentsName,
  typeClass,
  typeClassList,
  setTypeClass,
  address,
  setAddress,
  counsellorName,
  setCounsellorName,
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
            <div className="firstname__email row">
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
            <div className="dob_your_phone_number row">
              {/* 1. Date of Birth */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="dateofbirth">DOB</label>
                <input
                  class="form-control"
                  id="dateofbirth"
                  name="dateofbirth"
                  rows="4"
                  cols="50"
                  placeholder="Enter your DOB"
                  value={dob}
                  onChange={(e) => {
                    setDOB(e.target.value);
                  }}
                  type="date"
                ></input>
              </div>
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
            </div>

            <div className="qualification_address row">
              {/* 1. Qualification */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="qualification">Qualification</label>
                <Select
                  placeholder="Select qualification"
                  className="select__learning__module"
                  options={qualificationList}
                  value={{ label: qualification, value: qualification }}
                  onChange={(e) => {
                    setQualification(e.label);
                  }}
                />
              </div>
              {/* 2. Address */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="name">Address</label>
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="parent_your_name_phone row">
              {/* 1. Your Parents Name */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="parentsName">Parents Name</label>
                <input
                  class="form-control"
                  id="parentsName"
                  name="parentsName"
                  rows="4"
                  cols="50"
                  placeholder="Enter your Parents Name"
                  value={parentsName}
                  onChange={(e) => {
                    setParentsName(e.target.value);
                  }}
                  type="text"
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
            <div className="class_counsellorName row">
              {/* 1. Counsellor Name */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="name">Counsellor Name</label>
                <input
                  class="form-control"
                  id="name"
                  name="name"
                  rows="4"
                  cols="50"
                  placeholder="Enter Counsellor name"
                  value={counsellorName}
                  onChange={(e) => {
                    setCounsellorName(e.target.value);
                  }}
                ></input>
              </div>
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
