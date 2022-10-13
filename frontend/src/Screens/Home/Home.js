import React from 'react';

import { Sidebar } from '../../components/Sidebar';
import { TabContent } from '../TabContent';
import "../../styles/screens/home.css"

export  const Home = ()=>{
    return(
        <div className='home'>
            <Sidebar></Sidebar>
            <TabContent></TabContent>
        </div>
    )
}