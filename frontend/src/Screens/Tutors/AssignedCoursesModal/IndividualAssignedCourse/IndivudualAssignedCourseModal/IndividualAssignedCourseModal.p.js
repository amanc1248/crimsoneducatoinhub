import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import {
  datesList,
  monthsList,
  yearsList,
} from "../../../../../Data/StudentsData";

export function IndivudualAssignedCourseModalP({
  assignedCourse,
  handleOnCancelModal,
  handleOnChangeAssignedCourse,
  calculateSalaryAmount,
  allShifts,
  handleOnUpdate
}) {
  return (
    <Modal
      show={true}
      backdrop={true}
      keyboard={false}
      centered={true}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      style={{ background: "white" }}
    >
      <Modal.Header>
        <Modal.Title>Update Assigned Course</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="new__feature__request__form">
          {/* first row */}
          <div className="firstname__lastname row">
            {/* 1. First name */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="courseName">Course Name</label>
              <input
                class="form-control"
                id="courseName"
                name="courseName"
                rows="4"
                cols="50"
                placeholder="Course"
                value={assignedCourse.courseName}
                disabled={true}
              ></input>
            </div>

            {/* 2. Email  */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="courseFee">Course Fee</label>
              <input
                class="form-control"
                id="courseFee"
                name="courseFee"
                rows="4"
                cols="50"
                placeholder="Course Fee"
                value={`Rs. ${assignedCourse.courseFee}`}
                type="int"
                disabled={true}
              ></input>
            </div>
          </div>

          <br />
          {/* second row */}
          <div className="firstname__lastname row">
            {/* 1. First name */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="salaryPercentage">Salary Percentage</label>
              <input
                class="form-control"
                id="salaryPercentage"
                name="salaryPercentage"
                rows="4"
                cols="50"
                placeholder="Enter salary percentage"
                value={`${assignedCourse.salaryPercentage}`}
                onChange={(e) => {
                  handleOnChangeAssignedCourse(
                    "salaryPercentage",
                    e.target.value
                  );
                  calculateSalaryAmount(e.target.value);
                }}
                type="number"
              ></input>
            </div>

            {/* 2. Email  */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="salaryAmount">Salary Amount</label>
              <input
                class="form-control"
                id="salaryAmount"
                name="salaryAmount"
                rows="4"
                cols="50"
                placeholder="Salary Amount"
                value={`Rs. ${assignedCourse.salaryAmount}`}
                type="int"
                disabled={true}
              ></input>
            </div>
          </div>

          {/* Third Row */}
          <div className="firstname__lastname row">
            {/* 1. First name */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="shift">Select Shifts</label>
              <Select
                placeholder="Shift"
                className="selecting__divs"
                isMulti
                options={allShifts}
                defaultValue={assignedCourse.shifts}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("shifts", e);
                }}
              />
            </div>

            {/* 2. Email  */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="year">Select Start Year</label>
              <Select
                placeholder="Select Year"
                className="selecting__divs"
                options={yearsList}
                value={{label: assignedCourse.startYear, value: assignedCourse.startYear}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("startYear", e.value);
                }}
              />
            </div>
          </div>

          {/* Fourth Row */}
          <div className="firstname__lastname row">
            {/* 1. First name */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="month">Start Month</label>
              <Select
                placeholder="Select month"
                className="selecting__divs"
                options={monthsList}
                value={{label: assignedCourse.startMonth, value: assignedCourse.startMonth}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("startMonth", e.value);
                }}
              />
            </div>

            <div class="learning__form__group col-lg-6 col-12">
              <label htmlFor="">Select start date</label>
              <Select
                placeholder="startDate"
                className="selecting__divs"
                options={datesList}
                value={{label: assignedCourse.startDate, value: assignedCourse.startDate}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("startDate", e.value);
                }}
              />
            </div>
          </div>

          {/* Fifth Row */}
          <div className="firstname__lastname row">
            {/* 1. First name */}
            <div class="learning__form__group col-lg-6 col-12">
              <label for="year">Select End Year</label>
              <Select
                placeholder="Select Year"
                className="selecting__divs"
                options={yearsList}
                value={{label: assignedCourse.endYear, value: assignedCourse.endYear}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("endYear", e.value);
                }}
              />
            </div>
            <div class="learning__form__group col-lg-6 col-12">
              <label for="month">End Month</label>
              <Select
                placeholder="Select month"
                className="selecting__divs"
                options={monthsList}
                value={{label: assignedCourse.endMonth, value: assignedCourse.endMonth}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("endMonth", e.value);
                }}
              />
            </div>
          </div>

          {/* Sixth Row */}
          <div className="firstname__lastname row">
            <div class="learning__form__group col-lg-6 col-12">
              <label htmlFor="">Select start date</label>
              <Select
                placeholder="startDate"
                className="selecting__divs"
                options={datesList}
                value={{label: assignedCourse.endDate, value: assignedCourse.endDate}}
                onChange={(e) => {
                  handleOnChangeAssignedCourse("endDate", e.value);
                }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button
          className="btn"
          onClick={() => {
            handleOnCancelModal();
          }}
        >
          Cancel
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            handleOnUpdate()
          }}
        >
          Update
        </button>
      </Modal.Footer>
    </Modal>
  );
}
