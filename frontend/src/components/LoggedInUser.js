import React from 'react';

export const LoggedInUser = ({name,image,title})=>{
    return(
        <div className="logged__in__user">
            {name}
        </div>
    )
}