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
        { label: "Paid", value: "paid", checked: false , id:"paymentStatusPaid"},
        { label: "Not Paid", value: "not paid", checked: false, id:"paymentStatusNotPaid" },
      ],
    },
    startYear: {
      title: "Start Year",
      titleValue: "startYear",
      filters: [
        {id:"startYear2070", checked: false,label: 2070, value: 2070 },
        {id:"startYear2071", checked: false,label: 2071, value: 2071 },
        {id:"startYear2072", checked: false,label: 2072, value: 2072 },
        {id:"startYear2073", checked: false,label: 2073, value: 2073 },
        {id:"startYear2074", checked: false,label: 2074, value: 2074 },
        {id:"startYear2075", checked: false,label: 2075, value: 2075 },
        {id:"startYear2076", checked: false,label: 2076, value: 2076 },
        {id:"startYear2077", checked: false,label: 2077, value: 2077 },
        {id:"startYear2078", checked: false,label: 2078, value: 2078 },
        {id:"startYear2079", checked: false, label: 2079, value: 2079 },
        {id:"startYear2080", checked: false, label: 2080, value: 2080 },
        {id:"startYear2081", checked: false, label: 2081, value: 2081 },
        {id:"startYear2082", checked: false, label: 2082, value: 2082 },
        {id:"startYear2083", checked: false, label: 2083, value: 2083 },
        {id:"startYear2084", checked: false, label: 2084, value: 2084 },
        {id:"startYear2085", checked: false, label: 2085, value: 2085 },
        {id:"startYear2086", checked: false, label: 2086, value: 2086 },
        {id:"startYear2087", checked: false, label: 2087, value: 2087 },
      ],
    },
    startMonth: {
      title: "Start Month",
      titleValue: "startMonth",
      filters: [
        {label: "Baishakh", value: "Baishakh" , checked:false, id:"startMonthBaishakh"},
        {label: "Jestha", value: "Jestha" , checked:false, id:"startMonthJestha"},
        {label: "Ashadh", value: "Ashadh" , checked:false, id:"startMonthAshadh"},
        {label: "Shrawan", value: "Shrawan" , checked:false, id:"startMonthShrawan"},
        {label: "Bhadau", value: "Bhadau" , checked:false, id:"startMonthBhadau"},
        {label: "Asoj", value: "Asoj" , checked:false, id:"startMonthAsoj"},
        {label: "Kartik", value: "Kartik" , checked:false, id:"startMonthKartik"},
        {label: "Mangsir", value: "Mangsir", checked:false, id:"startMonthMangsir"},
        {label: "Poush", value: "Poush" , checked:false, id:"startMonthPoush"},
        { label: "Magh", value: "Magh", checked:false , id:"startMonthMagh"},
        { label: "Falgun", value: "Falgun" , checked:false, id:"startMonthFalgun"},
        { label: "Chaitra", value: "Chaitra" , checked:false, id:"startMonthChaitra"},
      ],
    },
    startDate: {
      title: "Start Date",
      titleValue: "startDate",
      filters: [
        {id:"startDate1", label: 1, value: 1, checked: false },
        {id:"startDate2", label: 2, value: 2, checked: false },
        {id:"startDate3", label: 3, value: 3, checked: false },
        {id:"startDate4", label: 4, value: 4, checked: false },
        {id:"startDate5", label: 5, value: 5, checked: false },
        {id:"startDate6", label: 6, value: 6, checked: false },
        {id:"startDate7", label: 7, value: 7, checked: false },
        {id:"startDate8", label: 8, value: 8, checked: false },
        {id:"startDate9", label: 9, value: 9, checked: false },
        {id:"startDate10", label: 10, value: 10, checked: false },
        {id:"startDate11", label: 11, value: 11, checked: false },
        {id:"startDate12", label: 12, value: 12, checked: false },
        {id:"startDate13", label: 13, value: 13, checked: false },
        {id:"startDate14", label: 14, value: 14, checked: false },
        {id:"startDate15", label: 15, value: 15, checked: false },
        {id:"startDate16", label: 16, value: 16, checked: false },
        {id:"startDate17", label: 17, value: 17, checked: false },
        {id:"startDate18", label: 18, value: 18, checked: false },
        {id:"startDate19", label: 19, value: 19, checked: false },
        {id:"startDate20", label: 20, value: 20, checked: false },
        {id:"startDate21", label: 21, value: 21, checked: false },
        {id:"startDate22", label: 22, value: 22, checked: false },
        {id:"startDate23", label: 23, value: 23, checked: false },
        {id:"startDate24", label: 24, value: 24, checked: false },
        {id:"startDate25", label: 25, value: 25, checked: false },
        {id:"startDate26", label: 26, value: 26, checked: false },
        {id:"startDate27", label: 27, value: 27, checked: false },
        {id:"startDate27", label: 27, value: 27, checked: false },
        {id:"startDate28", label: 28, value: 28, checked: false },
        {id:"startDate29", label: 29, value: 29, checked: false },
        {id:"startDate30", label: 30, value: 30, checked: false },
        {id:"startDate31", label: 31, value: 31, checked: false },
        {id:"startDate32", label: 32, value: 32, checked: false },
      ],
    },
    endYear: {
      title: "End Year",
      titleValue: "endYear",
      filters: [
        {id:"endYear2070", checked: false,label: 2070, value: 2070 },
        {id:"endYear2071", checked: false,label: 2071, value: 2071 },
        {id:"endYear2072", checked: false,label: 2072, value: 2072 },
        {id:"endYear2073", checked: false,label: 2073, value: 2073 },
        {id:"endYear2074", checked: false,label: 2074, value: 2074 },
        {id:"endYear2075", checked: false,label: 2075, value: 2075 },
        {id:"endYear2076", checked: false,label: 2076, value: 2076 },
        {id:"endYear2077", checked: false,label: 2077, value: 2077 },
        {id:"endYear2078", checked: false,label: 2078, value: 2078 },
        {id:"endYear2079", checked: false, label: 2079, value: 2079 },
        {id:"endYear2080", checked: false, label: 2080, value: 2080 },
        {id:"endYear2081", checked: false, label: 2081, value: 2081 },
        {id:"endYear2082", checked: false, label: 2082, value: 2082 },
        {id:"endYear2083", checked: false, label: 2083, value: 2083 },
        {id:"endYear2084", checked: false, label: 2084, value: 2084 },
        {id:"endYear2085", checked: false, label: 2085, value: 2085 },
        {id:"endYear2086", checked: false, label: 2086, value: 2086 },
        {id:"endYear2087", checked: false, label: 2087, value: 2087 },
      ],
    },
    endMonth: {
      title: "End Month",
      titleValue: "endMonth",
      filters: [
        {label: "Baishakh", value: "Baishakh" , checked:false, id:"endMonthBaishakh"},
        {label: "Jestha", value: "Jestha" , checked:false, id:"endMonthJestha"},
        {label: "Ashadh", value: "Ashadh" , checked:false, id:"endMonthAshadh"},
        {label: "Shrawan", value: "Shrawan" , checked:false, id:"endMonthShrawan"},
        {label: "Bhadau", value: "Bhadau" , checked:false, id:"endMonthBhadau"},
        {label: "Asoj", value: "Asoj" , checked:false, id:"endMonthAsoj"},
        {label: "Kartik", value: "Kartik" , checked:false, id:"endMonthKartik"},
        {label: "Mangsir", value: "Mangsir", checked:false, id:"endMonthMangsir"},
        {label: "Poush", value: "Poush" , checked:false, id:"endMonthPoush"},
        { label: "Magh", value: "Magh", checked:false , id:"endMonthMagh"},
        { label: "Falgun", value: "Falgun" , checked:false, id:"endMonthFalgun"},
        { label: "Chaitra", value: "Chaitra" , checked:false, id:"endMonthChaitra"},
      ],
    },
    endDate: {
      title: "End Date",
      titleValue: "endDate",
      filters: [
        {id:"endDate1", label: 1, value: 1, checked: false },
        {id:"endDate2", label: 2, value: 2, checked: false },
        {id:"endDate3", label: 3, value: 3, checked: false },
        {id:"endDate4", label: 4, value: 4, checked: false },
        {id:"endDate5", label: 5, value: 5, checked: false },
        {id:"endDate6", label: 6, value: 6, checked: false },
        {id:"endDate7", label: 7, value: 7, checked: false },
        {id:"endDate8", label: 8, value: 8, checked: false },
        {id:"endDate9", label: 9, value: 9, checked: false },
        {id:"endDate10", label: 10, value: 10, checked: false },
        {id:"endDate11", label: 11, value: 11, checked: false },
        {id:"endDate12", label: 12, value: 12, checked: false },
        {id:"endDate13", label: 13, value: 13, checked: false },
        {id:"endDate14", label: 14, value: 14, checked: false },
        {id:"endDate15", label: 15, value: 15, checked: false },
        {id:"endDate16", label: 16, value: 16, checked: false },
        {id:"endDate17", label: 17, value: 17, checked: false },
        {id:"endDate18", label: 18, value: 18, checked: false },
        {id:"endDate19", label: 19, value: 19, checked: false },
        {id:"endDate20", label: 20, value: 20, checked: false },
        {id:"endDate21", label: 21, value: 21, checked: false },
        {id:"endDate22", label: 22, value: 22, checked: false },
        {id:"endDate23", label: 23, value: 23, checked: false },
        {id:"endDate24", label: 24, value: 24, checked: false },
        {id:"endDate25", label: 25, value: 25, checked: false },
        {id:"endDate26", label: 26, value: 26, checked: false },
        {id:"endDate27", label: 27, value: 27, checked: false },
        {id:"endDate27", label: 27, value: 27, checked: false },
        {id:"endDate28", label: 28, value: 28, checked: false },
        {id:"endDate29", label: 29, value: 29, checked: false },
        {id:"endDate30", label: 30, value: 30, checked: false },
        {id:"endDate31", label: 31, value: 31, checked: false },
        {id:"endDate32", label: 32, value: 32, checked: false },
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
         checkPermission:'read',
        userId:localStorage.getItem('userId')
        
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
          const obj = { label: resultElement, value: resultElement, checked: false, id:`${dbTitleValue+resultElement}` };

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

  const changeFilterState = (id) => {
    setFilterState((prevState) =>
      prevState.map((mainObj, i) => {
        return {
          ...mainObj,
          ...(mainObj.filters = mainObj.filters.map((iObj, iObjIndex) => {
            if (iObj.id === id) {
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
        filterType:filterType,
        checkPermission:'read',
        userId:localStorage.getItem('userId')
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
