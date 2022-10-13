import React from 'react'

import { CompanyTitle } from './CompanyTitle';
import { LoggedInUser } from './LoggedInUser';
import "../styles/screens/home.css"
import { Logout } from './Logout';
import { DashboardTabsList } from './DashboardTabsList';

export const Sidebar = ()=>{
    return(
        <div className='sidebar'>
            <CompanyTitle companyName="Crimson Education Hub"/>
            <LoggedInUser name="Aman Chaudhary"/>
            <DashboardTabsList/>
            <Logout/>
        </div>
    )
}