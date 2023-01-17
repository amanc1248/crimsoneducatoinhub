import React from "react";
import Modal from "react-bootstrap/Modal";
import "../../styles/screens/home.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../../styles/screens/home.css";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
export const FilterP = ({
  filteringObject,
  changeFilterState,
  applyFilter,
  showFilterModal,
  setShowFilterModal,
}) => {
  return (
    <>
      <button
        className="filter__button"
        onClick={() => {
          setShowFilterModal(true);
        }}
      >
        Filter
        <FilterAltIcon></FilterAltIcon>
      </button>
      <Modal
        show={showFilterModal}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title>Filter contents</Modal.Title>
          <button>
            <RestartAltIcon></RestartAltIcon>Reset
          </button>
        </Modal.Header>
        <Modal.Body>
          {filteringObject
            ? filteringObject.map((obj, index) => {
                return (
                  <div key={index}>
                    <h5>{obj.title}</h5>
                    <div className="filters__div">
                      {obj.filters.map((filterObj, fbi) => {
                        return (
                          <div key={fbi} className="filter__div__single">
                            <label
                              htmlFor={filterObj.id}
                              style={{ marginRight: "5px" }}
                            >
                              {filterObj.value}
                            </label>
                            <input
                              type="checkbox"
                              onChange={() => {
                                changeFilterState(filterObj.id);
                              }}
                              checked={filterObj.checked}
                              id={filterObj.id}
                              name={filterObj.label}
                              value={filterObj.value}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <br />
                  </div>
                );
              })
            : "Loading..."}
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-close"
            onClick={() => {
              setShowFilterModal(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              applyFilter();
            }}
          >
            Apply Filter
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
