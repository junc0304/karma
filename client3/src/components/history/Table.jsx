import React, { Fragment, memo } from 'react';
import { Table } from 'react-bootstrap';

const TableComponent = ({ data, onClick }) => {
  return (
    <Fragment>
      {/* <Table hover variant="light" size="sm" > */}
      <div style={{ display: "flex", flexDirection: "column", flexWrap: "nowrap" }}>
        <TableHeaderComponent />
        <TableBodyComponent
          data={data}
          onClick={onClick}
        />
      </div>
      {/*   </Table> */}
    </Fragment>
  );
};

const TableHeaderComponent = memo(function () {
  return (
    <div
      style={{
        display: "flex", flexDirection: "row", flexWrap: "nowrap", backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        padding: '12px',
        marginBottom: '3px',
      }}
    >
      <div style={{ flex: 2, textAlign: "center" }}>
        <strong>Year</strong>
      </div>
      <div style={{ flex: 2, textAlign: "center" }}>
        <strong>Month</strong>
      </div>
      <div style={{ flex: 6, textAlign: "center" }}>
        <strong>Title</strong>

      </div>
    </div>

  );
});

const TableRowComponent = memo(function ({ year, month, title, index, onClick }) {
  return (
    <div
      className="hover"
      key={`history-row-${index}`}
      onClick={onClick}
      style={{
        display: "flex", flexDirection: "row", flexWrap: "nowrap", backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        padding: '8px',
        marginBottom: '1px',
        backgroundColor: "rgba(255,255,255, 0.8)",
        transition: '0.5s'
      }}
    >
      <div style={{ flex: 2, textAlign: "center" }}>{year}</div>
      <div style={{ flex: 2, textAlign: "center" }}>{month}</div>
      <div style={{ flex: 6, textAlign: "center" }}>{title}</div>
    </div>
  );
});

const TableBodyComponent = memo(function ({ data, onClick }) {

  const formatRow = (data) => {
    let arr = [];
    let prevYear = 0, prevMonth = 0;
    let year = 0, month = 0;

    Object.values(data).map((item, index) => {
      prevYear == item.year ? year = '' : year = item.year;
      prevYear == item.year && prevMonth == item.month ? month = '' : month = item.month;
      arr.push(
        <TableRowComponent
          key={`history-row-${index}`}
          year={year}
          month={month}
          title={item.title}
          index={index}
          onClick={() => onClick(item)}
        />
      );
      prevYear = item.year;
      prevMonth = item.month;
    });
    return arr;
  }

  return (
    <Fragment>
      {formatRow(data)}
    </Fragment>
  );
});

export default memo(TableComponent);