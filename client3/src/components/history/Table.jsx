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
      <div style={{ flex: 1 , textAlign:"center" }}>
        <strong>Year</strong>
      </div>
      <div style={{ flex: 2, textAlign:"center"  }}>
        <strong>Month</strong>
      </div>
      <div style={{ flex: 6 , textAlign:"center" }}>
        <strong>Title</strong>

      </div>
    </div>

  );
});

const TableRowComponent = memo(function ({ item, index, onClick }) {
  return (
    <div
      className="hover"
      style={{
        display: "flex", flexDirection: "row", flexWrap: "nowrap", backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '5px',
        padding: '8px',
        marginBottom: '3px',
        backgroundColor:"rgba(255,255,255, 0.8)",
        transition: '0.5s'
      }}
      key={`history-row-${index}`}
      onClick={onClick}
    >
      <div style={{ flex: 1, textAlign:"center" }}>
        {item.year}
      </div>
      <div style={{ flex: 2, textAlign:"center" }}>
        {item.month}
      </div>
      <div style={{ flex: 6 , textAlign:"center" }}>
        {item.title}
      </div>
    </div>
  );
});

const TableBodyComponent = memo(function ({ data, onClick }) {
  return (
    <Fragment>
      {Object.values(data).map((item, index) => (
        <TableRowComponent
          key={`history-row-${index}`}
          item={item}
          index={index}
          onClick={() => onClick(item)}
        />
      ))}
    </Fragment>
  );
});

export default memo(TableComponent);