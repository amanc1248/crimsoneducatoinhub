import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import { Loader } from "../../../components/Loader";

export function TutorModalPresentational({
  courseModalType,
  setName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  qualificationList,
  setQualification,
  handleClose,
  handleOnClickSubmit,
  handleOnClickUpdate,
  handleOnClickDelete,
  name,
  age,
  startDate,
  setAge,
  setStartDate,
  qualification,
  loader,
}) {
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
              ? "Add Tutor"
              : courseModalType === "Update"
              ? "Update Tutor"
              : "Delete Tutor"}
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
                  placeholder="Enter Your Name"
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

            {/* Courses */}

            <div className="learning__form__group">
              <label for="course">Phone Number</label>
              <input
                onInput={(e) => {
                  if (e.target.value.length > 10) {
                    e.target.value = e.target.value.slice(0, 10);
                  }
                }}
                maxLength={10}
                class="form-control"
                id="phnNumber"
                name="phnNumber"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                type="number"
              ></input>
            </div>
            <div class="learning__form__group">
              <label for="age">Age</label>
              <input
                class="form-control"
                id="age"
                name="age"
                rows="4"
                cols="50"
                placeholder="Enter Your Age"
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                }}
                type="number"
              ></input>
            </div>

            <div className="learning__form__group">
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

            <div className="learning__form__group row">
              {/* 3. Start Date  */}
              <div class="learning__form__group col-lg-12 col-12">
                <label for="startDate">Start Date</label>
                <input
                  type="date"
                  class="form-control"
                  id="startDate"
                  name="startDate"
                  rows="4"
                  cols="50"
                  placeholder="Select starting date"
                  value={startDate}
                  onChange={(e) => {
                    setStartDate(e.target.value);
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
