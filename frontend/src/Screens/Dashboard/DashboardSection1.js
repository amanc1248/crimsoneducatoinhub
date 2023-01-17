import React, { useEffect } from "react";

import "../../styles/screens/dashboard.css";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { calculateDate } from "../../actions/homeActions";
export const DashboardSection1 = () => {
  // 2. checklist
  const checkList = [
    {
      icon: <CheckCircleOutlineOutlinedIcon className="checklist__icon" />,
      firstText: "Number of student joined",
      secondText: " this month",
      color: "#FE4C24",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon className="checklist__icon" />,
      firstText: "Number of student that has",
      secondText: " completed course",
      color: "#62DAE1",
    },
    {
      icon: <CheckCircleOutlineOutlinedIcon className="checklist__icon" />,
      firstText: "Cashback program",
      secondText: " activated",
      color: "#D6B7A2",
    },
  ];

  return (
    <div className="dashboard__section1 col-5">
      <div className="dashboard__section1__content">
        <h5 className="section__1__title">Student Statistics</h5>

        {/* checklist */}
        <div className="checklist">
          {checkList.map((single) => (
            <div className="checklist__single">
              <div style={{ color: single.color }}>{single.icon}</div>
              <div className="checklist__text">
                <span className="checklist__text__1">{single.firstText}</span>
                <span className="checklist__text__2">{single.secondText}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
