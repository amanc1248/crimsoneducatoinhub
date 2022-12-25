import { useState } from "react";
import { CustomFilterP } from "./CustomFilter.p";

export const CustomFilterC = () => {
  const [customFilterType, setCustomFilterType] = useState('students');
  const [result, setResult] = useState([]);
  const handleSettingCustomFilterType = (value) => {
    setCustomFilterType(value);
    setResult("")
  };
  return (
    <CustomFilterP
      customFilterType={customFilterType}
      handleSettingCustomFilterType={handleSettingCustomFilterType}
      result={result}
      setResult={setResult}
    ></CustomFilterP>
  );
};
