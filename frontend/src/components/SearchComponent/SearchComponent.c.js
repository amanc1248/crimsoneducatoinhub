import React from "react";
import { generateSearchOptions } from "../../utils/utils";
import { SearchComponentP } from "./SearchComponent.p";
export const SearchComponentC = ({
  originalList,
  setOriginalList
}) => {

   const madeUpList =  generateSearchOptions(originalList)
  // functions

  const onChangeHandle = (filteringValue) => {
    console.log("FIltering value: ", filteringValue);
    if(filteringValue!=="" && madeUpList.length>0){
        let filteredMadeUpList = [];
      filteredMadeUpList = madeUpList.filter((m, i) => {
      return m.value.toLowerCase().includes(filteringValue.toLowerCase());
    });
    if (filteredMadeUpList.length>0) {
        let foundList = [];
        for(let madeUpItem of filteredMadeUpList) {
           const foundItem =  originalList.find((item)=>item._id===madeUpItem.id);
           foundList.push(foundItem);
        }
      setOriginalList(foundList);
    }else{
        setOriginalList([]);
    }
    }else{
        setOriginalList(originalList)
    }
  };

  return <SearchComponentP onChangeHandle={onChangeHandle}></SearchComponentP>;
};
