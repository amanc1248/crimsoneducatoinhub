import React, { useEffect } from 'react'
import axios from 'axios'

import { DashboardSection1 } from './DashboardSection1'
import { DashboardSection2 } from './DashboardSection2'
import { DashboardSection3 } from './DashboardSection3'

export const DashboardContainer = ()=>{
    
    return(
        <div className='dashboard__container'>
            {/* <div className="dashboard__upper__section row g-0">
                <DashboardSection1/>
                <DashboardSection2/>
            </div> */}
            <div className="dashboard__lower__section row g-0">
                <DashboardSection3/>
            </div>
        </div>
    )
}