import React from 'react'

import "../../styles/screens/dashboard.css"
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
export const DashboardSection1 =()=>{

    // DATA
    // 1. performance list
    const performanceList =[
        {number:76,label:'Income'},
        {number:44,label:'Spendings'},
    ]
    // 2. checklist
    const checkList = [
      {
        icon: <CheckCircleOutlineOutlinedIcon className="checklist__icon" />,
        firstText: "Spending course",
        secondText: " was taken",
        color: "#FE4C24",
      },
      {
        icon: <CheckCircleOutlineOutlinedIcon className="checklist__icon" />,
        firstText: "Deposit progress",
        secondText: " was setup",
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
          <h5 className="section__1__title">Performance</h5>

          {/* performance list */}
          <div className="perfomance__list">
            {performanceList.map((pl) => (
              <div key={pl.label} className="perfomance__number">
                <h2 style={{ color: "white" }}>{pl.number}%</h2>
                <div className="performance__text">{pl.label}</div>
              </div>
            ))}
          </div>

          {/* checklist */}
          <div className="checklist">
            {checkList.map((single) => (
              <div className="checklist__single">
                <div style={{color:single.color}}>{single.icon}</div>
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
}