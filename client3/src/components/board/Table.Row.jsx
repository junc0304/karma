import React, { memo } from 'react';
import { Badge } from 'react-bootstrap';

const TableRow = memo(({ item, index, onClick }) => {
  
  const isNew = () => new Date().setDate(new Date().getDate() -5) < new Date(item.created);
  const formatTime = (time) => new Intl.DateTimeFormat('en-US', { month: "short", day: "numeric", year: "numeric" }).format(new Date(time));
  const commentExist = (item) => item.comments.length > 0;

  return (
    <tr  className="text-center" noGutters key={index} onClick={() => onClick(item)} >
      <td className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} >
        {item.index}
      </td>
      <td xs={8} sm={6} md={6} lg={6}>
        {`${item.title} `} 
        {commentExist(item) && (
          <span style={{fontSize:"12px"}}>{` [${item.comments.length}] `}</span>
        )}
        {isNew() && (
          <Badge variant="danger" style={{fontSize:"10px"}}>new</Badge>
        )} 
      </td>
      <td xs={4} sm={3} md={3} lg={3}>
        {formatTime(item.created)}
      </td>
      <td className="d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2} >
        {item.authorName}
      </td>
    </tr>
  );
});

export default TableRow;