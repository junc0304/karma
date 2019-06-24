import React, { memo, useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationComponent = memo(({ dataSize, pageSize, paginationSize, currentPage, setCurrentPage }) => {

  const [pager, setPager] = useState([]);
  const [currentPagers, setCurrentPagers] = useState(1);
  const lastPage = Math.max(Math.ceil(dataSize / pageSize), 1);
  const lastPager = Math.max(Math.ceil(dataSize / (pageSize * paginationSize)), 1);

  useEffect(() => {
    const pushPagers = () => {
      let pagerItems = [];
      let firstItem = Math.ceil((currentPagers - 1) * paginationSize + 1);
      let lastItem = Math.min(lastPage, firstItem + paginationSize - 1);
      for (let i = firstItem; i <= lastItem; i++) {
        pagerItems.push(
          <Pagination.Item
            key={i}
            onClick={() => { setCurrentPage(i) }}>{i}</Pagination.Item>);
      }
      setPager(pagerItems);
    }
    pushPagers();
  }, [lastPage, currentPagers, setCurrentPage, paginationSize]);

  const toNextPagers = () => {
    setCurrentPage((currentPagers) * paginationSize + 1);
    setCurrentPagers(currentPagers + 1);
  }

  const toPrevPagers = () => {
    setCurrentPage((currentPagers - 1) * paginationSize);
    setCurrentPagers(currentPagers - 1);
  }

  const toNextPage = () => {
    if (currentPage % paginationSize === 0) {
      setCurrentPagers(currentPagers + 1);
    }
    setCurrentPage(currentPage + 1);
  }

  const toPrevPage = () => {
    if (currentPage % paginationSize === 1) {
      setCurrentPagers(currentPagers - 1);
    }
    setCurrentPage(currentPage - 1);
  }

  const toFirstPage = () => {
    setCurrentPage(1);
    setCurrentPagers(1)
  }

  const toLastPage = () => {
    const lastPage = Math.ceil(dataSize / pageSize);
    setCurrentPage(lastPage);
    setCurrentPagers(Math.ceil(lastPage / paginationSize));
  }

  return (
    <Pagination size="md" className="justify-content-center">
      <Pagination.First
        disabled={currentPage === 1}
        onClick={() => toFirstPage()} />
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => toPrevPage()} />
      <Pagination.Ellipsis
        disabled={currentPagers === 1}
        onClick={() => toPrevPagers()} />
      {pager}
      <Pagination.Ellipsis
        disabled={currentPagers === lastPager}
        onClick={() => toNextPagers()} />
      <Pagination.Next
        disabled={currentPage === lastPage}
        onClick={() => toNextPage()} />
      <Pagination.Last
        disabled={currentPage === lastPage}
        onClick={() => toLastPage()} />
    </Pagination>
  );
});

export default PaginationComponent;