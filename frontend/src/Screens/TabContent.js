import React from "react";

import "../styles/screens/home.css";
import { CoursesContainer } from "./Courses/Courses.c";
import {  CustomFilterC } from "./CustomFilter/CustomFilter.c";
import { DashboardContainer } from "./Dashboard/DashboardContainer";
import { ShiftsContainer } from "./Shifts/Shifts.c";
import { StudentsContainer } from "./Students/StudentsContainer";
import { TutorsContainer } from "./Tutors/TutorsContainer";

export const TabContent = ({ tabIndex }) => {
  // data
  // 1. tabs
  const tabs = [
    <DashboardContainer />,
    <CoursesContainer/>,
    <TutorsContainer />,
    <StudentsContainer />,
    <ShiftsContainer />,
    <CustomFilterC></CustomFilterC>
  ];
  return (
    <div className="tab__content">
      <div className="tab__content__inside">{tabs[tabIndex]}</div>
    </div>
  );
};
