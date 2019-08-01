import React, { memo, useEffect, useState, Fragment } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { isWithinDays, isEmpty, dateTime } from '../../helpers';
import { flexbox } from '@material-ui/system';
import styles from './Board.css';

const TableComponent = memo(({ pageState, data, onClick }) => {

  const { page, pageSize } = pageState;
  const start = (page.current - 1) * pageSize;
  const end = start + pageSize;
  const [rows, setRows] = useState([]);
  useEffect(() => setRows(Object.values(data).slice(start, end)), [data, page]);

  return (
    <Fragment className="" size="sm" variant="light" style={{ display: "flex", flexWrap: "wrap", margin: " 0 0 3em 0", padding: 0 }}>
      <TableHeaderComponent />
      <TableBodyComponent data={rows} onClick={onClick} />
    </Fragment>
  )
});

const TableBodyComponent = memo(({ data, onClick }) => {
  return (
    <Fragment>
      {data.map((item, index) => <TableRowComponent key={index} item={item} onClick={onClick} />)}
    </Fragment>
  );
});

const TableRowComponent = memo(({ item, onClick }) => {
  const { index, title, created, authorName, comments } = item;
  let { date, time } = dateTime.shortDate(created);

  return (
    <div className="table-row" key={index} onClick={() => onClick(item)} >
      <div className="text index">{index}</div>
      <div className="text title">
        <span>{title}</span>
        {!isEmpty(comments) && <span>{`[${comments.length}]`}</span>}
        {isWithinDays(created, 5) && <Badge variant="danger">N</Badge>}
      </div >
      <div className="text author">{authorName}</div>
      <div className="text date">
        <span>{date}</span>
        <span>{time}</span>
      </div>
    </div>
  );
});

const TableHeaderComponent = memo(() => {
  return (
      <div className="table-row header">
        <div className="text index">#</div>
        <div className="text title">Title</div>
        <div className="text author">Author</div>
        <div className="text date">Date</div>
      </div>
  );
});


export default TableComponent;
