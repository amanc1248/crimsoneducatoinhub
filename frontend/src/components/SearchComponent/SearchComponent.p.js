import React from "react";

import "../../styles/screens/home.css";
export const SearchComponentP = ({ onChangeHandle }) => {
  return (
      <input
        type="text"
        className="searching__component"
        placeholder="Search anything..."
        onChange={(e) => {
          onChangeHandle(e.target.value);
        }}
      />
  );
};
