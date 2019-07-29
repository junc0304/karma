import React, { memo, useEffect, useState, Fragment } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { isWithinDays, isEmpty, dateTime } from '../../helpers';


const TableComponent = memo(({ pageState, data, onClick }) => {

  const { page, pageSize } = pageState;
  const start = (page.current - 1) * pageSize;
  const end = start + pageSize;
  const [rows, setRows] = useState([]);

  useEffect(() => setRows(Object.values(data).slice(start, end)), [data, page]);
  return (
    <Fragment>
      <Table variant="light" hover style={{ width: '100%' }}>
        <TableHeaderComponent />
        <TableBodyComponent
          data={rows}
          onClick={onClick}
        />
      </Table>
    </Fragment>
  )
});

const TableRowComponent = memo(({ item, onClick }) => {
  const { index, title, created, authorName, comments } = item;
  return (
    <tr
      className="text-center"
      key={index}
      onClick={() => onClick(item)}
    >
      <td className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} >{index}</td>
      <td xs={8} sm={6} md={6} lg={6} style={{ width: '100%', whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {title}
        {!isEmpty(comments) && <span style={{ fontSize: "12px" }}>{` [${comments.length}]`}</span>}
        {isWithinDays(created, 5) && <Badge variant="danger" style={{ fontSize: "10px" }}>N</Badge>}
      </td>
      <td xs={4} sm={3} md={3} lg={3} style={{ wordBreak: 'keep-all' }}>
        <span style={{ whiteSpace: "nowrap" }}>{dateTime.shortDate(created)}</span>
      </td>
      <td className="d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2} >{authorName}</td>
    </tr>
  );
});

const TableHeaderComponent = memo(() => {
  return (
    <thead style={{ padding: '0px!important' }} >
      <tr className="text-center">
        <td className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} >#</td>
        <td xs={8} sm={6} md={6} lg={6} >Title</td>
        <td xs={4} sm={3} md={3} lg={3} >Date</td>
        <td className="d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2} >By</td>
      </tr>
    </thead>
  );
});

const TableBodyComponent = memo(({ data, onClick }) => {
  return (
    <tbody>
      {data.map((item, index) =>
        <TableRowComponent key={index} item={item} onClick={onClick} />
      )}
    </tbody>
  );
});

export default TableComponent;
