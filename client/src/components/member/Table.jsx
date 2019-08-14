import React, { memo } from 'react';
import { Table } from 'react-bootstrap';

const TableComponent = memo(({ data, onClick }) => {
  return (
    <Table variant='light' hover>
      <TableHeader />
      <TableBody data={data} onClick={onClick} />
    </Table>
  );
});

const TableHeader = memo(function () {
  return (
    <thead style={{ textAlign: 'center' }}>
      <tr>
        <th xs={8} sm={8} md={8} lg={8} >DEPOT NAME</th>
        <th xs={4} sm={4} md={4} lg={4} >OWNER</th>
      </tr>
    </thead>
  )
});

const TableBody = memo(function ({ data, onClick }) {

  return (
    <tbody style={{ textAlign: 'center' }}>
      {Object.values(data).map((item, index) =>
        <TableRow
          key={index}
          item={item}
          index={index}
          onClick={onClick}
        />
      )}
    </tbody>
  )
});

const TableRow = memo(function ({ item, index, onClick }) {
  return (
    <tr as='tr' key={index} onClick={() => onClick(item)}>
      <th as='th' xs={8} sm={8} md={8} lg={8} >{item.depotName}</th>
      <th as='th' xs={4} sm={4} md={4} lg={4} >{item.name}</th>
    </tr>
  )
})

export default TableComponent;