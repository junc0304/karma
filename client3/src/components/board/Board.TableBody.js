import React, { memo, useEffect, useState, Fragment } from 'react';

const BoardTableBody = memo(({ onClick, pageSize, data, currentPage }) => {
  const [currentData, setCurrentData] = useState([]);
  const [showRow, setShowRow] = useState(false);
  const [row, setRow] = useState({});

  useEffect(() => {
    const loadPageData = async () => {
      setCurrentData(
        Object.values(data).slice((currentPage - 1) * pageSize, currentPage * pageSize)
      );
    }
    loadPageData();
  }, [data, pageSize, currentPage]);

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(time));
  }

  return (
    <Fragment>
      <tbody>
        { currentData.map((item, index) =>
          <tr
            onClick={() => onClick(item)}
            className="d-flex text-center"
            key={index}>
            <td
              className="col-1 d-none d-sm-block"
              key={`#-row-${index}`}>
              {item.index}</td>
            <td
              className="col-6 "
              key={`title-row-${index}`}>
              {item.title}</td>
            <td
              className="col-3 "
              key={`date-row${index}`}>
              {formatTime(item.created)}</td>
            <td
              className="col-2 d-none d-sm-block"
              key={`by-row-${index}`}>
              {item.authorName}</td>
          </tr>)}
      </tbody>
    
    </Fragment>
  );
});

export default BoardTableBody;