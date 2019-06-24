import React, { memo, useEffect, useState, Fragment } from 'react';
import { Table } from 'react-bootstrap';

import RowComponent from './Table.Row';
import { BOARD_PROPERTY } from '../../config';
import PostView from './Table.Row.View';

//table header
const TableHeader = memo(() => {
  return (
    <thead>
      <tr className="d-flex text-center" >
        <th className="col-1 d-none d-sm-block">
          #</th>
        <th className="col-6 ">
          Title</th>
        <th className="col-3 ">
          Date</th>
        <th className="col-2 d-none d-sm-block">
          By</th>
      </tr>
    </thead>
  );
});

//table body(rows)
const TableBody = memo(({ data, onClick }) => {
  return (
    <tbody>
      {data.map((item, index) =>
        <RowComponent key={index} item={item} index={index} onClick={onClick} />)}
    </tbody>
  );
});

//table
const TableComponent = memo(({ type, currentPage, data }) => {
  const [currentDataList, setCurrentDataList] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [rowData, setRowData] = useState({});
  //get current data
  useEffect(() => {
    const loadData = async () => {
      setCurrentDataList(
        Object.values(data)
          .slice((currentPage - 1) * BOARD_PROPERTY.PAGE_SIZE, currentPage * BOARD_PROPERTY.PAGE_SIZE));
    }
    loadData();
  }, [data, currentPage]);
  
  const onClickRow = (item) => {
    setRowData(item);
    setShowRow(true);
  }
  return (
    <Fragment>
      <Table variant="light">
        <TableHeader />
        <TableBody
          data={currentDataList} 
          onClick={onClickRow} />
      </Table>
      <PostView
        show={showRow}
        setShow={setShowRow}
        data={rowData} />
    </Fragment>
  )
});

export default TableComponent;
