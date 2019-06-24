import React, {memo} from 'react';

//single row component
const TableRow = memo(({ item, index, onClick }) => {
  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(time));
  }
  return (
    <tr
      key={index}
      onClick={() => onClick(item)}
      className="d-flex text-center" >
      <td className="col-1 d-none d-sm-block">
        {item.index}</td>
      <td className="col-6">
        {item.title}</td>
      <td className="col-3 ">
        {formatTime(item.created)}</td>
      <td className="col-2 d-none d-sm-block">
        {item.authorName}</td>
    </tr>
  );
});

export default TableRow;