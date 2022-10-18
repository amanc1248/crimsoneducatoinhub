import React,{useState} from 'react';

import { Sidebar } from '../../components/Sidebar';
import { TabContent } from '../TabContent';
import "../../styles/screens/home.css"

export  const Home = ()=>{
    const[tabIndex,setTabIndex]=useState(0);

    return(
        <div className='home'>
            <Sidebar tabIndex={tabIndex} setTabIndex={setTabIndex}></Sidebar>
            <TabContent tabIndex={tabIndex}></TabContent>
        </div>
    )
}