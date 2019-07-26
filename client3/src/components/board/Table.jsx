import React, { memo, useEffect, useState, Fragment } from 'react';
import { Table, Row, Col,Badge } from 'react-bootstrap';

import { BOARD_PROPERTY } from '../../config';
import PostView from './Table.Row.View.jsx';

const TableRowComponent = memo(({ item, onClick }) => {
  const { index, title, created, authorName, comments} = item;

  const isNew = () => new Date().setDate(new Date().getDate() -5) < new Date(item.created);
  const commentExist = (item) => item.comments.length > 0;
  const formatTime = (time) => ( 
    new Intl.DateTimeFormat('en-US', { month: "short", day: "numeric", year: "numeric" }).format(new Date(time))
  );

  return (
    <tr
      className="text-center" 
      key={index} 
      onClick={() => onClick(item)} 
    >
      <td className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} >
        {index}
      </td>
      <td xs={8} sm={6} md={6} lg={6} style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow:"ellipsis"}}>
        {`${title} `} 
        {commentExist(item) && (
          <span style={{fontSize:"12px"}}>{` [${comments.length}] `}</span>
        )}
        {isNew() && (
          <Badge variant="danger" style={{fontSize:"10px"}}>new</Badge>
        )} 
      </td>
      <td xs={4} sm={3} md={3} lg={3}>
        {formatTime(created)}
      </td>
      <td className="d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2} >
        {authorName}
      </td>
    </tr>
  );
});

//table header
const TableHeaderComponent = memo(() => {
  return (
    <thead>
      <tr className="text-center">
        <th className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1}>#</th>
        <th xs={8} sm={6} md={6} lg={6}>Title</th>
        <th xs={4} sm={3} md={3} lg={3}>Date</th>
        <th className="d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2}>By</th>
      </tr>
    </thead>
  );
});

//table body(rows)
const TableBodyComponent = memo(({ data, onClick }) => {
  return (
    <tbody>
      {data.map((item, index) => 
        <TableRowComponent key={index} item={item} onClick={onClick} />
      )}
    </tbody>
  );
});

//table
const TableComponent = memo(({ page, data }) => {

  const [rows, setRows] = useState([]);
  const [row, setRow] = useState({data:{}, show:false});

  useEffect(() => {
    const loadData = async () => {
      let start = (page - 1) * BOARD_PROPERTY.PAGE_SIZE;
      let end = page * BOARD_PROPERTY.PAGE_SIZE;
      setRows( Object.values(data).slice(start, end) );
    }
    loadData();
  }, [data, page]);

  const handleOpenRow = (item) => setRow({ data: item, show: true });
  const handleCloseRow = () => setRow({ data: {}, show: false });
  const handleDeleteRow = () => { /* delete logic */ };
  const handleSubmit = (formData) => {/* submit logic */ };

  return (
    <Fragment>
      <Table variant="light" hover>
        <TableHeaderComponent />
        <TableBodyComponent 
          data={rows} 
          onClick={handleOpenRow} 
        />
      </Table>
      <PostView 
        show={row.show}
        data={row.data}  
        onClose={handleCloseRow} 
        onDelete={handleDeleteRow} 
        onSubmit={handleSubmit} 
      />
    </Fragment>
  )
});

export default TableComponent;
