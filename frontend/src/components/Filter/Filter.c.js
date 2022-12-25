import React, { useState } from "react";
import { useEffect } from "react";
import { getAllData, getDocumentByFilter } from "../../actions/homeActions";
import { removeDuplicates } from "../../utils/utils";
import { FilterP } from "./Filter.p";
export const FilterC = ({
  collectionName,
  aggregateArray,
  returnAs,
  setResult,
  wantedDBList,
  wantedLocalList,
  filterType

}) => {
  console.log("Wanted db list: ", wantedDBList)
  // data
  const localLists = {
    paymentStatus: {
      title: "Payment Status",
      titleValue: "paymentStatus",
      filters: [
        { label: "Paid", value: "paid", checked: false },
        { label: "Not Paid", value: "not paid", checked: false },
      ],
    },
    months: {
      title: "Month",
      titleValue: "month",
      filters: [
        {label: "Baishakh", value: "Baishakh" , checked:false},
        {label: "Jestha", value: "Jestha" , checked:false},
        {label: "Ashadh", value: "Ashadh" , checked:false},
        {label: "Shrawan", value: "Shrawan" , checked:false},
        {label: "Bhadau", value: "Bhadau" , checked:false},
        {label: "Asoj", value: "Asoj" , checked:false},
        {label: "Kartik", value: "Kartik" , checked:false},
        {label: "Mangsir", value: "Mangsir", checked:false },
        {label: "Poush", value: "Poush" , checked:false},
        { label: "Magh", value: "Magh", checked:false },
        { label: "Falgun", value: "Falgun" , checked:false},
        { label: "Chaitra", value: "Chaitra" , checked:false},
      ],
    },
    year: {
      title: "Year",
      titleValue: "year",
      filters: [
        { label: "2001", value: "2001", checked: false },
        { label: "2002", value: "2002", checked: false },
        { label: "2003", value: "2003", checked: false },
      ],
    },
    startDate: {
      title: "Start Date",
      titleValue: "startDate",
      filters: [
        { label: 1, value: 1, checked: false },
        { label: 2, value: 2, checked: false },
        { label: 3, value: 3, checked: false },
        { label: 4, value: 4, checked: false },
        { label: 5, value: 5, checked: false },
        { label: 6, value: 6, checked: false },
        { label: 7, value: 7, checked: false },
        { label: 8, value: 8, checked: false },
        { label: 9, value: 9, checked: false },
        { label: 10, value: 10, checked: false },
        { label: 11, value: 11, checked: false },
        { label: 12, value: 12, checked: false },
        { label: 13, value: 13, checked: false },
        { label: 14, value: 14, checked: false },
        { label: 15, value: 15, checked: false },
        { label: 16, value: 16, checked: false },
        { label: 17, value: 17, checked: false },
        { label: 18, value: 18, checked: false },
        { label: 19, value: 19, checked: false },
        { label: 20, value: 20, checked: false },
        { label: 21, value: 21, checked: false },
        { label: 22, value: 22, checked: false },
        { label: 23, value: 23, checked: false },
        { label: 24, value: 24, checked: false },
        { label: 25, value: 25, checked: false },
        { label: 26, value: 26, checked: false },
        { label: 27, value: 27, checked: false },
        { label: 27, value: 27, checked: false },
        { label: 28, value: 28, checked: false },
        { label: 29, value: 29, checked: false },
        { label: 30, value: 30, checked: false },
        { label: 31, value: 31, checked: false },
        { label: 32, value: 32, checked: false },
      ],
    },
    endDate: {
      title: "End Date",
      titleValue: "endDate",
      filters: [
        { label: 1, value: 1, checked: false },
        { label: 2, value: 2, checked: false },
        { label: 3, value: 3, checked: false },
        { label: 4, value: 4, checked: false },
        { label: 5, value: 5, checked: false },
        { label: 6, value: 6, checked: false },
        { label: 7, value: 7, checked: false },
        { label: 8, value: 8, checked: false },
        { label: 9, value: 9, checked: false },
        { label: 10, value: 10, checked: false },
        { label: 11, value: 11, checked: false },
        { label: 12, value: 12, checked: false },
        { label: 13, value: 13, checked: false },
        { label: 14, value: 14, checked: false },
        { label: 15, value: 15, checked: false },
        { label: 16, value: 16, checked: false },
        { label: 17, value: 17, checked: false },
        { label: 18, value: 18, checked: false },
        { label: 19, value: 19, checked: false },
        { label: 20, value: 20, checked: false },
        { label: 21, value: 21, checked: false },
        { label: 22, value: 22, checked: false },
        { label: 23, value: 23, checked: false },
        { label: 24, value: 24, checked: false },
        { label: 25, value: 25, checked: false },
        { label: 26, value: 26, checked: false },
        { label: 27, value: 27, checked: false },
        { label: 27, value: 27, checked: false },
        { label: 28, value: 28, checked: false },
        { label: 29, value: 29, checked: false },
        { label: 30, value: 30, checked: false },
        { label: 31, value: 31, checked: false },
        { label: 32, value: 32, checked: false },
      ],
    },
  };

  // useStates
  const [filterState, setFilterState] = useState();
  const [showFilterModal, setShowFilterModal] = useState(false);

  // use effects
  useEffect(()=>{
    if(showFilterModal){
      console.log("wantedDBList bfefor: ",wantedDBList)

    const asyncList = wantedDBList.map((value,index)=>{
      return getAllData({
        url: "/api/commonRoute/getData",
        collectionName: value.collectionName,
        pageNumber: 1,
        nPerPage: 100,
      })
    })
     Promise.all(asyncList).then((result)=>{
      console.log("The russkskskdf: ", result)
      for (let index = 0; index < wantedDBList.length; index++) {
        const list= [];
        const dbTitleValue = wantedDBList[index].collectionTitleValue;
        console.log("dbtitlevalue: ",dbTitleValue)
        for(let index2 = 0; index2 <result[index].length; index2++){
          const resultElement = result[index][index2][dbTitleValue];
          console.log("Result Element: ", resultElement)
          const obj = { label: resultElement, value: resultElement, checked: false };

          list.push(obj);
        }
        wantedDBList[index].filters = list;
      }
      console.log("wantedDBList after: ",wantedDBList)
      let localList = JSON.parse(JSON.stringify(wantedDBList));
      for(let localListValue of wantedLocalList){
        localList.push(localLists[localListValue]);
      }
      setFilterState(localList)
    })
    }
  },[showFilterModal])

  const changeFilterState = (value) => {
    setFilterState((prevState) =>
      prevState.map((mainObj, i) => {
        return {
          ...mainObj,
          ...(mainObj.filters = mainObj.filters.map((iObj, iObjIndex) => {
            if (iObj.value === value) {
              return { ...iObj, ...(iObj.checked = !iObj.checked) };
            } else {
              return iObj;
            }
          })),
        };
      })
    );
  };

  // remove duplicates







  // applying filter
  const applyFilter = async () => {
    const originalFilter = {};
    const filter = filterState;

    for (let i = 0; i < filter.length; i++) {
      const searchingArray = [];
      for (let j = 0; j < filter[i].filters.length; j++) {
        if (filter[i].filters[j].checked === true) {
          searchingArray.push(filter[i].filters[j].value);
        }
      }
      const key = filter[i].titleValue;
      if (searchingArray.length > 0) {
        originalFilter[key] = { $in: searchingArray };
      }
      console.log(searchingArray);
    }

    if (Object.keys(originalFilter).length === 0) {
      alert("No filter applied");
    } else {
      aggregateArray.unshift({ $match: originalFilter });
      getDocumentByFilter({
        url: "/api/commonRoute/getDocumnetsByFilter",
        collectionName,
        filter: filterState,
        aggregateArray: aggregateArray,
        returnAs,
        filterType:filterType
      }).then((result) => {
        aggregateArray.shift();
        const list = removeDuplicates(result,result.length)
        setResult(list);
        setShowFilterModal(false)

      });
    }
  };
  return (
    // <div></div>
   <FilterP
      filteringObject={filterState}
      changeFilterState={changeFilterState}
      applyFilter={applyFilter}
      showFilterModal={showFilterModal}
      setShowFilterModal={setShowFilterModal}
    ></FilterP>
  );
};
