import { useState} from 'react';

const usePagination = (itemsPerPage, totalItems) => {
  const [activePage, setActivePage] = useState(0)
  const pageCount = Math.ceil(totalItems / itemsPerPage)

  const getPaginatedItems = (items) => {
    const startIndex = activePage * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return items.slice(startIndex, endIndex)
  }

  const handlePageChange = (pageIndex) => {
    setActivePage(pageIndex)
  }

  const handleNextPage = () => {
    if (activePage < pageCount - 1) {
      setActivePage(prevPage => prevPage + 1)
    }
  }

  const handlePrevPage = () => {
    if (activePage > 0) {
      setActivePage(prevPage => prevPage - 1)
    }
  }

  const isFirstPage = activePage === 0
  const isLastPage = activePage === pageCount - 1 || pageCount === 0

  return {
    activePage,
    pageCount,
    getPaginatedItems,
    handlePageChange,
    handleNextPage,
    handlePrevPage,
    isFirstPage,
    isLastPage,
  }
}

export default usePagination;