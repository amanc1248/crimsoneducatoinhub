import React from 'react';

import "../styles/screens/home.css"
import { DashboardContainer } from './Dashboard/DashboardContainer';

export const TabContent =()=>{
    return(
        <div className="tab__content">
            <div className="tab__content__inside">
                <DashboardContainer/>
            </div>
        </div>
    )
}