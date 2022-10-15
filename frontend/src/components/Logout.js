import React from 'react';

import LogoutIcon from '@mui/icons-material/Logout';

export const Logout =()=>{
    return(
        <div className="logout">
            <div className="logout__icon"><LogoutIcon/></div>
            <div className="logout__text">Exit</div>
        </div>
    )
}