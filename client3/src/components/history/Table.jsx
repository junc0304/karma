import React, { useState,  memo, useContext, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import RowFormComponent from './Form';

const TableComponent = ({data}) => {
  
  const [ row, setRow ] = useState({ data:{}, show:false});

  const handleOpenRow = (item) => setRow({ data: item, show: true });
  const handleCloseRow = () => setRow({ data: {}, show: false });
  const handleDeleteRow = () => { /* delete logic */ };
  const handleSubmit = (formData) => {/* submit logic */ };

  return (
    <Fragment>
      <Table hover variant="light" size="sm" >
        <TableHeaderComponent />
        <TableBodyComponent
          data={data}
          onClick={handleOpenRow} 
        />
      </Table>
      <RowFormComponent 
        data={row.data} 
        show={row.show} 
        onClose={handleCloseRow} 
        onDelete={handleDeleteRow} 
        onSubmit={handleSubmit} 
      />
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
    <tr key={index} onClick={onClick}>
      <td>{item.year}</td>
      <td>{item.month}</td>
      <td>{item.title}</td>
    </tr>
  );
});

const TableBodyComponent = memo(function ({data, onClick}) {
  return (
    <tbody>
      {Object.values(data).map((item, index) => (
        <TableRowComponent 
          key={index} 
          item={item} 
          index={index} 
          onClick={() => onClick(item)}
        />
      ))}
    </tbody>
  );
});

export default memo(TableComponent);