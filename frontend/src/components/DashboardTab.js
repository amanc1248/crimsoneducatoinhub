import React from 'react';

import "../styles/screens/home.css"

export const DashboardTab =({title, icon})=>{
    return(
        <div className="dashboard__tab">
            <div className="dashboard__tab__icon">{icon}</div>
            <div className="dashboard__tab__title">{title}</div>
        </div>
    )
}