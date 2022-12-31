import React from "react";

import "../styles/screens/home.css";
import { CoursesContainer } from "./Courses/CoursesContainer";
import { DashboardContainer } from "./Dashboard/DashboardContainer";
import { ShiftsContainer } from "./Shifts/ShiftContainer";
import { StudentsContainer } from "./Students/StudentsContainer";
import { TutorsContainer } from "./Tutors/TutorsContainer";
import Users from "./Users/Users";

export const TabContent = ({ tabIndex }) => {
  // data
  // 1. tabs
  const tabs = [
    <DashboardContainer />,
    <CoursesContainer />,
    <TutorsContainer />,
    <StudentsContainer />,
    <ShiftsContainer />,

    <Users />,
  ];
  return (
    <div className="tab__content">
      <div className="tab__content__inside">{tabs[tabIndex]}</div>
    </div>
  );
};
