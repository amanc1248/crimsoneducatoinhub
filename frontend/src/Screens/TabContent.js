import React from 'react';

import "../styles/screens/home.css"
import { CoursesContainer } from './Courses/CoursesContainer';
import { DashboardContainer } from './Dashboard/DashboardContainer';
import { StudentsContainer } from './Students/StudentsContainer';
import { TutorsContainer } from './Tutors/TutorsContainer';

export const TabContent =({tabIndex})=>{
    // data
    // 1. tabs
    const tabs =[<DashboardContainer/>, <CoursesContainer/>,<TutorsContainer/>,  <StudentsContainer/>];
    return(
        <div className="tab__content">
            <div className="tab__content__inside">
                {tabs[tabIndex]}
            </div>
        </div>
    )
}