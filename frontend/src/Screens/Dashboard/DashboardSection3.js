import React, { useState } from 'react'

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook';
export const DashboardSection3 =()=>{

    // data
    const list =[
        {icon:<PersonIcon sx={{ fontSize: 15 }}/>, title:"Students", number:123},
        {icon:<SchoolIcon sx={{ fontSize: 15 }}/>, title:"Tutors", number:123},
        {icon:<MenuBookIcon sx={{ fontSize: 15 }}/>, title:"Courses", number:123},
        {icon:<HomeIcon sx={{ fontSize: 15 }}/>, title:"Revenue", number:1230},
    ]

    // use states
    const [cardsList,setCardsList]   = useState(list);
    return (
      <div className="dashboard__section3 col-12">
        <div className="dashboard__section3__content row g-0">
          <div className="section3__title col-3">
            <h5 style={{fontWeight:600}}>Engagement</h5>
            <div className="section3__description">
              General static of user engagement process
            </div>
          </div>
          <div className="cards__list col-9 row g-0">
          {cardsList.map((card) => (
            <div className="section3__card col-3" key={card.title}>
              <div className="section3__card__content">
                <div className="card__icon">{card.icon}</div>
                <div className="card__title">{card.title}</div>
                <div className="card__number">{card.number}</div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </div>
    );
}