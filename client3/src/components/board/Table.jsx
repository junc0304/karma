import React, { memo, useEffect, useState, Fragment } from 'react';
import {  Badge } from 'react-bootstrap';
import { isWithinDays, isEmpty, dateTime } from '../../helpers';
import { PersonIcon, DateIcon } from '../icons';

const TableComponent = memo(({ pageState, data, onClick }) => {

  const { page, pageSize } = pageState;
  const start = (page.current - 1) * pageSize;
  const end = start + pageSize;
  const [rows, setRows] = useState([]);
  useEffect(() => setRows(Object.values(data).slice(start, end)), [data, page]);

  return (
    <Fragment>
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
    <div key={index} onClick={() => onClick(item)} 
      className="hover board-row-wrapper"
     /*  style={{
        display: "flex", flexDirection: "row", flexWrap: "wrap",
        backgroundColor: "white", borderRadius: "5px", padding: "8px", marginBottom: "3px",
      }} */
    >
      <div className="board-row-inner-wrapper"
       /*  style={{
          flex: "2", minWidth: "280px",
          display: "flex", flexDirection: "row",
        }} */
      >
        <div className="board-row-index"
          /* style={{
            flex: "1",
            fontSize: "15px", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center"
          }} */
        >{index}</div>
        <div className="board-row-title"
         /*  style={{
            flex: "9",
            display: "flex", flexDirection: "row", alignItems: "center"
          }} */
        >
          <span
            style={{ fontSize: "16px" }}
          >{title}&nbsp;
          </span>
          {!isEmpty(comments) && (
            <span className="row-comment"
              style={{
                fontSize: "15px",
                display: "flex", flexDirection: "row", alignItems: "center"
              }}
            >{`[${comments.length}] `}
            </span>
          )}
          {isWithinDays(created, 5) && (
            <Badge
              variant="danger"
              style={{
                fontSize: "12px", marginLeft: "5px",
                display: "flex", flexDirection: "row", alignItems: "center"
              }}
            >N
              </Badge>
          )}
        </div >
      </div>

      <div className="board-row-inner-wrapper2"
        /* style={{
          flex: "1",
          display: "flex", flexDirection: "row",
          fontSize: "15px", alignItems: "center"
        }} */
      >
        <div className="board-row-authorname"
          /* style={{
            flex: "2",
            display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap"
          }} */
        >
          <PersonIcon style={{ fontSize: "16px" }} />
          {authorName} &ensp;
              </div>
        <div className="board-row-datetime"
      /*    style={{
            flex: "3",
            minWidth: "160px"
          }}  */
        >
          <span
            style={{
              display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap"
            }}
          >
            <DateIcon style={{ fontSize: "15px" }} />
            {date}
            {time}
          </span>
        </div>
      </div>
    </div>
  );
});

const TableHeaderComponent = memo(() => {
  return (
    <div
      style={{
        display: "flex", flexDirection: "row", flexWrap: "wrap",
        backgroundColor: "white", borderRadius: "5px", padding: "10px", marginBottom: "5px",
      }}
    >
      <div
        style={{
          flex: "2", minWidth: "280px",
          display: "flex", flexDirection: "row",
        }}
      >
        <div
          style={{
            flex: "1",
            fontSize: "17px", display: "flex", justifyContent: "center", alignItems: "center"
          }}
        > #
        </div>
        <div
          style={{
            flex: "9",
            fontSize: "17px", display: "flex", justifyContent: "center",alignItems: "center"
          }}
        > Title
        </div >
      </div>

      <div
        style={{
          flex: "1",
          display: "flex", flexDirection: "row", fontSize: "17px", alignItems: "center"
        }}
      >
        <div
          style={{
            flex: "2",
            display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap"
          }}
        > Author
        </div>
        <div
          style={{
            flex: "3",
            minWidth: "160px"
          }}
        >
          <span
            style={{
              display: "flex", alignItems: "center", justifyContent: "center", whiteSpace: "nowrap"
            }}
          > Date
          </span>
        </div>
      </div>
    </div>
  );
});


export default TableComponent;
