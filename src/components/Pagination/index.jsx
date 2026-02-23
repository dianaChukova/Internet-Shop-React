import React from "react";
import "../Shop/shop.css";
import "../../App.css";

function Pagination({
  onPageChange,
  activePage,
  pageCount,
  handleNextPage,
  handlePrevPage,
  isFirstPage,
  isLastPage,
}) { 
  return (
    <div className="pagination" id="pagination">
      <button
        onClick={handlePrevPage}
        disabled={isFirstPage}
        className="button-left"
        id="left-pagin-arrow"
        style={{ visibility: isFirstPage ? "hidden" : "visible" }}
      >
        <img src="icons/left-pagin-arrow.svg" alt="Left Arrow" />
      </button>

      <div className="pages js-pages">
        {Array.from({ length: pageCount }, (_, index) => (
          <div
            key={index}
            onClick={() => onPageChange(index)}
            className={`page ${activePage === index ? "active" : ""}`}
            style={{ fontWeight: activePage === index ? "bold" : "normal" }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <button
        onClick={handleNextPage}
        disabled={isLastPage}
        className="button-right"
        id="right-pagin-arrow"
        style={{ visibility: isLastPage ? "hidden" : "visible" }}
      >
        <img src="icons/right-pagin-arrow.svg" alt="Right Arrow" />
      </button>
    </div>
  );
}

export default Pagination;
