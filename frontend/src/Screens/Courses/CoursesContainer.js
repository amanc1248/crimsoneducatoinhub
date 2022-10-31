import React, { useState } from 'react';
import Button from "react-bootstrap/Button";
import { Pagination } from '../../components/Pagination';
import { CourseModal } from './CourseModal';

export const CoursesContainer =()=>{

    // USESTATES
    const [showModal, setShowModal]        = useState(false);

    // FUNCTIONS
    const openModalOnClick        = ()=>{setShowModal(true)};
    const closeModalOnClick       = ()=>{setShowModal(false)}  

    return (
      <div className="courses__container">

        {/*course modal  */}
        <CourseModal show={showModal} setShow={setShowModal} />

        {/* add button and pagination button */}
        <div className="action__buttons">
            <Button
            variant="primary"
            size="sm"
            onClick={openModalOnClick}
            >
            Add Course
            </Button>
            <Pagination
            totalPages={3}
            nextButtonName="Next"
            prevButtonName="Prev"
            currentPage={1}
            />
        </div>
      </div>
    );
}