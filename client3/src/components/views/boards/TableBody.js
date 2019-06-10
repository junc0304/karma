import React, { memo, useEffect, useState } from 'react';

const TableBody = memo(
  ({ pageSize, data, currentPage }) => {
    const [currentData, setCurrentData] = useState([]);

    useEffect(() => {
      const loadData = () =>
        setCurrentData(
          data.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        );
      loadData();
    }, [data, currentPage]);

    return (
      <tbody>
        {Object.values(currentData).map((item, index) =>
          <tr key={index}>
            <td key={`#-row-${index}`}>{item}</td>
            <td key={`title-row-${index}`}>{item}</td>
            <td key={`date-row${index}`}>{item}</td>
            <td key={`by-row-${index}`}>{item}</td>
          </tr>)}
      </tbody>
    );
  });

export default TableBody;