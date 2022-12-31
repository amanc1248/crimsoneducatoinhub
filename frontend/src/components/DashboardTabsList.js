import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DashboardTab } from "./DashboardTab";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
export const DashboardTabsList = ({ tabIndex, setTabIndex }) => {
  // DATA
  const tabsList = [
    { label: "Dashboard", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
    { label: "Courses", icon: <MenuBookIcon sx={{ fontSize: 18 }} /> },
    { label: "Tutors", icon: <SchoolIcon sx={{ fontSize: 18 }} /> },
    { label: "Students", icon: <PersonIcon sx={{ fontSize: 18 }} /> },
    { label: "Shifts", icon: <AccessTimeFilledIcon sx={{ fontSize: 18 }} /> },
    { label: "Custom Filter", icon: <FilterAltIcon sx={{ fontSize: 18 }} /> },
    { label: "Users", icon: <PeopleAltIcon sx={{ fontSize: 18 }} /> },
  ];

  // usestate
  return (
    <div className="dashboard__tabs__list">
      {tabsList.map((tab, index) => (
        <DashboardTab
          title={tab.label}
          icon={tab.icon}
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          index={index}
        />
      ))}
    </div>
  );
};
