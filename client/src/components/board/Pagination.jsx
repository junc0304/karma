import React, { Fragment } from 'react';
import { Pagination } from 'react-bootstrap';

const PaginationSetComponent = ({ start, end, onClick, page:{current} }) => {
  let arr = [];
  for (let i = start; i <= end; i++) arr.push(i);
  return (
    <Fragment>
      {arr.map((item, index) => (
        <Pagination.Item 
          key={item} 
          active={current===item}
          onClick={() => { onClick(item)}}
        >
          {item}
        </Pagination.Item>
        )
      )}
    </Fragment>
  )
}

const PaginationComponent = ({ dispatch, data }) => {
  let { page, pageSet, lastPage, lastPageSet } = data;

  /* const handleClickNextPage = () => dispatch({ type: 'nextPage' });
  const handleClickPrevPage = () => dispatch({ type: 'prevPage' }); */
  const handleClickNextPageSet = () => dispatch({ type: 'nextPageSet' });
  const handleClickPrevPageSet = () => dispatch({ type: 'prevPageSet' });
  const handleClickLastPage = () => dispatch({ type: 'lastPage' });
  const handleClickFirstPage = () => dispatch({ type: 'firstPage' });
  const handleClickPage = (number) => dispatch({ type: 'goToPage', value: number });

  return (
    <Pagination size='sm' className='justify-content-center'>
      <Pagination.First disabled={page.current === 1} onClick={handleClickFirstPage} />
      {/* <Pagination.Prev disabled={page.current === 1} onClick={handleClickPrevPage} /> */}
      <Pagination.Ellipsis disabled={pageSet === 1} onClick={handleClickPrevPageSet} />
      <PaginationSetComponent start={page.start} end={page.end} onClick={handleClickPage} page={page} />
      <Pagination.Ellipsis disabled={pageSet === lastPageSet} onClick={handleClickNextPageSet} />
     {/*  <Pagination.Next disabled={page.current === lastPage} onClick={handleClickNextPage} /> */}
      <Pagination.Last disabled={page.current === lastPage} onClick={handleClickLastPage} />
    </Pagination>
  )
}

export default (PaginationComponent);