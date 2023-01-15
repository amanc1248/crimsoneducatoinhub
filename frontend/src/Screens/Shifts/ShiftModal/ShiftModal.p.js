import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import {
  deleteData,
  insertData,
  updateData,
} from "../../../actions/homeActions";

export function ShiftModalPresentational({
  shift,
  setShift,
  courseModalType,
  setRefresh,
  handleClose,
  handleOnClickDelete,
  handleOnClickSubmit,
  handleOnClickUpdate,
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
              ? "Add Shift"
              : courseModalType === "Update"
              ? "Update Shift"
              : "Delete Shift"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="new__feature__request__form">
            <div class="learning__form__group ">
              <label for="shift">Shift Name</label>
              <input
                class="form-control"
                id="shift"
                name="shift"
                rows="4"
                cols="50"
                placeholder="Enter Shift Name"
                value={shift.name}
                onChange={(e) => {
                  setShift((prevState) => {
                    return {
                      ...prevState,
                      name: e.target.value,
                    };
                  });
                }}
              ></input>
            </div>
            <div className="starttime_endtime row">
              {/* 1. Starting Time */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="startTime">Start Time</label>
                <input
                  class="form-control"
                  id="startTime"
                  name="startTime"
                  rows="4"
                  cols="50"
                  placeholder="Enter Start Time"
                  value={shift.startTime}
                  onChange={(e) => {
                    setShift((prevState) => {
                      return { ...prevState, startTime: e.target.value };
                    });
                  }}
                  type="time"
                  pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                ></input>
              </div>

              {/* 2. Ending Time  */}
              <div class="learning__form__group col-lg-6 col-12">
                <label for="endTime">End Time</label>
                <input
                  class="form-control"
                  id="endTime"
                  name="endTime"
                  rows="4"
                  cols="50"
                  value={shift.endTime}
                  onChange={(e) => {
                    setShift((prevState) => {
                      return {
                        ...prevState,
                        endTime: e.target.value,
                      };
                    });
                  }}
                  type="time"
                ></input>
              </div>
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
