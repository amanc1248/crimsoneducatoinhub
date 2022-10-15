import React from 'react';

import "../styles/components/components.css"

export const CompanyTitle = ({companyName})=>{
    return (
        <div className="companyTitle">
            {companyName}
        </div>
    )
}