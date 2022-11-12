import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  deleteData,
  getCourseData,
  insertData,
  updateData,
} from "../../actions/homeActions";

export function ShiftModal({
  show,
  setShow,
  shifts,
  setShifts,
  individualShift,
  courseModalType,
  setRefresh,
}) {
  //   usestates
  // USESTATES

  const [shiftName, setShiftName] = useState(
    individualShift && individualShift.shiftName
  );

  const [startTime, setStartTime] = useState(
    individualShift && individualShift.startTime
  );
  const [endTime, setEndTime] = useState(
    individualShift && individualShift.endTime
  );

  const [loader, setLoader] = useState(false);

  // functions
  // 1. on adding shifts
  const handleOnClickSubmit = () => {
    const doc = {
      shiftName,
      startTime,
      endTime,
    };
    if ((shiftName, startTime, endTime)) {
      let list = shifts;
      setLoader(true);
      insertData({
        url: "/api/commonRoute/insertData",
        collectionName: "shifts",
        doc,
      })
        .then((result) => {
          setShifts(list);
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
    setShiftName("");
    setStartTime("");
    setEndTime("");
    setShow(false);
  };

  // 3. on updating course
  const handleOnClickUpdate = () => {
    const doc = {
      shiftName,
      startTime,
      endTime,
    };
    if ((shiftName, startTime, endTime)) {
      setLoader(true);
      updateData({
        url: "/api/commonRoute/updateData",
        collectionName: "shifts",
        updatedTo: doc,
        id: individualShift._id,
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
  };

  // 4. on deleting course
  const handleOnClickDelete = () => {
    setLoader(true);
    deleteData({
      url: `/api/commonRoute/deleteData?id=${individualShift._id}&collectionName=shifts`,
    })
      .then((result) => {
        setRefresh(true);
        setLoader(false);
        handleClose();
      })
      .catch((e) => {
        console.log(e);
      });
  };
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
                value={shiftName}
                onChange={(e) => {
                  setShiftName(e.target.value);
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
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
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
                  // placeholder="hrs:mins"
                  // pattern="^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$"
                  // required
                  value={endTime}
                  onChange={(e) => {
                    setEndTime(e.target.value);
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
