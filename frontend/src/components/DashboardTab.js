import React from 'react';

import "../styles/screens/home.css"

export const DashboardTab =({title, icon, tabIndex, setTabIndex,index})=>{
    
    return(
        <div className={`dashboard__tab ${tabIndex===index && 'dashboard__tab__active'}`} onClick={()=>{setTabIndex(index)}}>
            <div className="dashboard__tab__icon">{icon}</div>
            <div className="dashboard__tab__title">{title}</div>
        </div>
    )
}