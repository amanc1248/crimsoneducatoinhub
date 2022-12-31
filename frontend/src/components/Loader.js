import React from "react";
import { FallingLines, RotatingSquare, TailSpin } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="loader">
      <TailSpin
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="tail-spin-loading"
        radius="0.5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export const LoaderFallingLines = () => {
  return (
    <FallingLines
      color="#4fa94d"
      width="100"
      visible={true}
      ariaLabel="falling-lines-loading"
    />
  );
};

export const LoaderRotatingSquare = () => {
  return (
    <RotatingSquare
      height="100"
      width="100"
      color="#4fa94d"
      ariaLabel="rotating-square-loading"
      strokeWidth="4"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};
