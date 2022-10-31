import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { DashboardTab } from "./DashboardTab";

export const DashboardTabsList = ({ tabIndex, setTabIndex }) => {
  // DATA
  const tabsList = [
    { label: "Dashboard", icon: <HomeIcon sx={{ fontSize: 18 }} /> },
    { label: "Courses", icon: <MenuBookIcon sx={{ fontSize: 18 }} /> },
    { label: "Tutors", icon: <SchoolIcon sx={{ fontSize: 18 }} /> },
    { label: "Students", icon: <PersonIcon sx={{ fontSize: 18 }} /> },
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
