import React from "react";
import { TailSpin } from "react-loader-spinner";

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
