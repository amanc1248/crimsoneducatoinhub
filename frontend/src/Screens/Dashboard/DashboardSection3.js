import React, { useEffect, useState } from "react";

import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { getTotalCount } from "../../actions/homeActions";
import Invoice from "../../components/Invoice";
export const DashboardSection3 = () => {
  // data
  const list = [
    {
      icon: <PersonIcon sx={{ fontSize: 15 }} />,
      title: "Students",
    },
    {
      icon: <SchoolIcon sx={{ fontSize: 15 }} />,
      title: "Tutors",
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 15 }} />,
      title: "Courses",
    },
    {
      icon: <MenuBookIcon sx={{ fontSize: 15 }} />,
      title: "Shifts",
    },
  ];

  const [totalNumbers, setTotalNumbers] = useState();

  useEffect(() => {
    getTotalCount({
      url: "/api/commonRoute/getTotalDocument",
      collectionNames: ["students", "tutors", "courses", "shifts"],
    })
      .then((result) => {
        setTotalNumbers(result);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // use states
  const [cardsList, setCardsList] = useState(list);
  return (
    <div className="dashboard__section3 col-12">
      {/* <div className="dashboard__section3__content row g-0">
        <div className="section3__title col-3">
          <h5 style={{ fontWeight: 600 }}>Engagement</h5>
          <div className="section3__description">
            General static of user engagement process
          </div>
        </div>
        <div className="cards__list col-9 row g-0">
          {cardsList &&
            totalNumbers &&
            cardsList.map((card, index) => (
              <div className="section3__card col-4">
                <div className="section3__card__content">
                  <div className="card__icon">{card.icon}</div>
                  <div className="card__title">{card.title}</div>
                  <div className="card__number">{totalNumbers[index]}</div>
                </div>
              </div>
            ))}
        </div>
      </div> */}
      <div>
        <Invoice />
      </div>
    </div>
  );
};
