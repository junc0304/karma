import React, { Fragment, memo } from 'react';
import { Table } from 'react-bootstrap';

const TableComponent = ({ data, onClick }) => {
  return (
    <Fragment>
      <Table hover variant="light" size="sm" >
        <TableHeaderComponent />
        <TableBodyComponent
          data={data}
          onClick={onClick}
        />
      </Table>
    </Fragment>
  );
};

const TableHeaderComponent = memo(function () {
  return (
    <thead>
      <tr>
        <th>Year</th>
        <th>Month</th>
        <th>Title</th>
      </tr>
    </thead>
  );
});

const TableRowComponent = memo(function ({ item, index, onClick }) {
  return (
    <tr key={`history-row-${index}`} onClick={onClick}>
      <td>{item.year}</td>
      <td>{item.month}</td>
      <td>{item.title}</td>
    </tr>
  );
});

const TableBodyComponent = memo(function ({ data, onClick }) {
  return (
    <tbody>
      {Object.values(data).map((item, index) => (
        <TableRowComponent
          key={`history-row-${index}`}
          item={item}
          index={index}
          onClick={() => onClick(item)}
        />
      ))}
    </tbody>
  );
});

export default memo(TableComponent);