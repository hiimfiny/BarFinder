import React, { useState, useEffect, useMemo } from "react"
import { Pagination } from "react-bootstrap"
import "../index.css"
type PaginationProps = {
  currentPage: number
  totalElements: number
  pageSize: number
  selectPage: (selectedNumber: number) => void
}

const PaginationPanel = (props: PaginationProps) => {
  //const [pageItems, setPageItems] = useState<JSX.Element[]>([])
  const [currentPage, setCurrentPage] = useState(props.currentPage)

  const totalPages = Math.ceil(props.totalElements / props.pageSize)

  const onPageClick = (page_number: number) => {
    if (page_number > 0 && page_number <= totalPages) {
      setCurrentPage(page_number)
      props.selectPage(page_number)
      //func(page_number, props.numberOfPages, 5)
    }
  }

  const pageItems = useMemo(() => {
    const maxDisplayedPages = 5; // Maximum number of pages to display

    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > maxDisplayedPages) {
      const middle = Math.ceil(maxDisplayedPages / 2);
      if (currentPage > middle) {
        startPage = currentPage - (middle - 1);
        endPage = currentPage + (maxDisplayedPages - middle);
      } else {
        endPage = maxDisplayedPages;
      }
    }

    if (totalPages <= maxDisplayedPages) {
      startPage = 1;
      endPage = totalPages;
    }

    endPage = Math.min(endPage, totalPages); // Ensure endPage doesn't exceed total pages

    const items: JSX.Element[] = [];

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageClick(i)}
          style={{backgroundColor: "#3e505b"}}
        >
          {i}
        </Pagination.Item>
      );
    }

    return items;
  }, [props.totalElements, props.pageSize, currentPage, onPageClick]);
  return (
    <div>
      <Pagination className="centered-panel-element">
        <Pagination.Prev
          onClick={() => {
            onPageClick(currentPage - 1)
          }}
        />
        {pageItems}
        <Pagination.Next
          onClick={() => {
            onPageClick(currentPage + 1)
          }}
        />
      </Pagination>
    </div>
  )
}

export default PaginationPanel
