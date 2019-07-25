import React, { memo, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import {BOARD_PROPERTY} from '../../config';
const {PAGINATION_SIZE, PAGE_SIZE} = BOARD_PROPERTY;





const PaginationComponent = memo(({ dataSize, currentPage, setCurrentPage }) => {

  const [pagers, setPagers] = useState([]);
  const [currentPagers, setCurrentPagers] = useState(1);
  const lastPage = Math.max(Math.ceil(dataSize / PAGE_SIZE), 1);
  const lastPager = Math.max(Math.ceil(dataSize / (PAGE_SIZE * PAGINATION_SIZE)), 1);
  useEffect(() => {
    const getPagers = () => {
      let pagerItems = [];
      let firstItem = Math.ceil((currentPagers - 1) * PAGINATION_SIZE + 1);
      let lastItem = Math.min(lastPage, firstItem + PAGINATION_SIZE - 1);
      for (let i = firstItem; i <= lastItem; i++) {
        pagerItems.push( 
        <Pagination.Item key={i} onClick={() => { setCurrentPage(i) }}>{i}</Pagination.Item> );
      }
      setPagers(pagerItems);
    }
    getPagers();
  }, [lastPage, currentPagers, currentPage, setCurrentPage]);
  const toNextPagers = () => {
    setCurrentPage((currentPagers) * PAGINATION_SIZE + 1);
    setCurrentPagers(currentPagers + 1);
  }
  const toPrevPagers = () => {
    setCurrentPage((currentPagers - 1) * PAGINATION_SIZE);
    setCurrentPagers(currentPagers - 1);
  }
  const toNextPage = () => {
    if (currentPage % PAGINATION_SIZE === 0) setCurrentPagers(currentPagers + 1);
    setCurrentPage(currentPage + 1);
  }
  const toPrevPage = () => {
    if (currentPage % PAGINATION_SIZE === 1) setCurrentPagers(currentPagers - 1);
    setCurrentPage(currentPage - 1);
  }
  const toFirstPage = () => {
    setCurrentPage(1);
    setCurrentPagers(1)
  }
  const toLastPage = () => {
    setCurrentPage(lastPage);
    setCurrentPagers(lastPager);
  }
  return (
    <Pagination size="md" className="justify-content-center">
      <Pagination.First
        disabled={currentPage === 1}
        onClick={toFirstPage} />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={toPrevPage} />
      <Pagination.Ellipsis
        disabled={currentPagers === 1}
        onClick={toPrevPagers} />
      {pagers}
      <Pagination.Ellipsis
        disabled={currentPagers === lastPager}
        onClick={toNextPagers} />
      <Pagination.Next
        disabled={currentPage === lastPage}
        onClick={toNextPage} />
      <Pagination.Last
        disabled={currentPage === lastPage}
        onClick={toLastPage} />
    </Pagination>
  );
});

export default PaginationComponent;