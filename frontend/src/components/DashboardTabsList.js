import React from 'react';
import { DashboardTab } from './DashboardTab';

export const DashboardTabsList =()=>{

    // DATA
    const tabsList =[
        {label:"Dashboard"},
        {label:"Students"},
        {label:"Tutors"},
        {label:"Courses"},
        {label:"Dashboard"},
    ]

    return(
        <div className="dashboard__tabs__list">
            {tabsList.map((tab)=><DashboardTab title={tab.label}/>)}
        </div>
    )
}