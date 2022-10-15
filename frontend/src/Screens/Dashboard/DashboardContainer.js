import React from 'react'
import { DashboardSection1 } from './DashboardSection1'
import { DashboardSection2 } from './DashboardSection2'
import { DashboardSection3 } from './DashboardSection3'

export const DashboardContainer = ()=>{
    return(
        <div className='dashboard__container'>
            <DashboardSection1/>
            <DashboardSection2/>
            <DashboardSection3/>
        </div>
    )
}