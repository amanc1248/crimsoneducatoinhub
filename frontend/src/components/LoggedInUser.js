import React from 'react';

import "../styles/components/components.css"

export const LoggedInUser = ({name,image,title})=>{
    return(
        <div className="logged__in__user">
            <img src={image} alt="loggedInUser"className='user__image'/>
            <div className="user__name">{name}</div>
            <div className="user__title">{title}</div>
        </div>
    )
}