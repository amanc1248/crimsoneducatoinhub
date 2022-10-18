import React from 'react';
import "../styles/screens/home.css"

export const Pagination = ({totalPages, nextButtonName, prevButtonName, currentPage, setCurrentPage  }) => {

    // FUNCTIONS
    // 1. adding list of pages in the pagination buttons
    const addPages =()=>{
        let pagesButtons =[];
        for(let i=1;i<=totalPages;i++){
        pagesButtons.push(i);
        }
        return pagesButtons.map((pageButton,index)=>{
        return (
            <div className={`page__count__button ${pageButton===currentPage ? 'active__page__count__button':'inactive__page__count__button'}`} key={index}
            onClick={()=>{
            setCurrentPage(pageButton)
            }}
            >
            {pageButton}
            </div>
        )
        })
    } 
  return (
    <div className="blog__paginations ml-10">
      <button
        className="prev__button__pagi"
        onClick={() => {
          setCurrentPage(currentPage - 1);
        }}
        disabled={currentPage === 1}
      >
        {prevButtonName}
      </button>
      {totalPages && addPages()}
      <button
        className="next__button__pagi"
        onClick={() => {
          setCurrentPage(currentPage + 1);
        }}
        disabled={currentPage === totalPages}
      >
        {nextButtonName
        }
      </button>
    </div>
  );
}; 