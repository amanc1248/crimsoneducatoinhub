import React from 'react'

import { CompanyTitle } from './CompanyTitle';
import { LoggedInUser } from './LoggedInUser';
import "../styles/screens/home.css"
import { Logout } from './Logout';
import { DashboardTabsList } from './DashboardTabsList';

export const Sidebar = ({tabIndex, setTabIndex})=>{
    return(
        <div className='sidebar'>
            <CompanyTitle companyName="Crimson Education Hub"/>
            <LoggedInUser image={'https://res.cloudinary.com/proudposhak-com/image/upload/v1634636733/products/41/1_mxidw1.png'} name="Aman Chaudhary" title="CEO"/>
            <DashboardTabsList tabIndex={tabIndex} setTabIndex={setTabIndex}/>
            <Logout/>
        </div>
    )
}