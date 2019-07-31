import React, { memo, useEffect, useState, Fragment } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { isWithinDays, isEmpty, dateTime } from '../../helpers';
import { flexbox } from '@material-ui/system';


const TableComponent = memo(({ pageState, data, onClick }) => {

  const { page, pageSize } = pageState;
  const start = (page.current - 1) * pageSize;
  const end = start + pageSize;
  const [rows, setRows] = useState([]);
  useEffect(() => setRows(Object.values(data).slice(start, end)), [data, page]);

  return (
    <Fragment>
      <Table size="sm" variant="light" hover style={{ display:flexbox, tableLayout:"auto", overflow: "hidden", wordWrap:"break-word"}}>
        <TableHeaderComponent />
        <TableBodyComponent
          data={rows}
          onClick={onClick}
        />
      </Table>
    </Fragment>
  )
});

const TableRowComponent = memo(({ item, onClick }) => {
  const { index, title, created, authorName, comments } = item;
  let {date, time} = dateTime.shortDate(created);

  return (
    <tr
      style={{lineHeight:"99%"}}
      key={index}
      onClick={() => onClick(item)}
    >
      <td className="text-center d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} style={{ whiteSpace: "nowrap", fontSize:"14px" }} >{index}</td>
      <td xs={7} sm={5} md={5} lg={5} style={{ paddingLeft:"1rem", width: '100%', overflow: "hidden", textOverflow: "ellipsis" }}>
        <span style={{ fontSize:"14px" }}>{title}</span>
        {!isEmpty(comments) && <span style={{ fontSize: "13px", marginLeft:"2px"}}>{`[${comments.length}]`}</span>}
        {isWithinDays(created, 5) && <Badge variant="danger" style={{ fontSize: "12px", marginLeft:"2px" }}>N</Badge>}
      </td>
      <td className="text-center d-none d-sm-block" xs={"auto"} sm={2} md={2} lg={2} style={{ whiteSpace: "nowrap", fontSize:"14px" }}>
        {authorName}
      </td>
      <td className="text-center" xs={3} sm={2} md={2} lg={2} style={{ wordBreak: 'keep-all',lineHeight:"80%" }}>
        <span style={{ whiteSpace: "nowrap", fontSize:"11px" }}>{date}</span>
        <br/>
        <span style={{ whiteSpace: "nowrap", fontSize:"11px"}}>{time}</span>
      </td>
    </tr>
  );
});

const TableHeaderComponent = memo(() => {
  return (
    <thead style={{ padding: '0px!important' }} >
      <tr className="text-center">
        <td className="d-none d-sm-block" xs={"auto"} sm={1} md={1} lg={1} >
          #
        </td>
        <td xs={8} sm={5} md={5} lg={5} >
          Title
        </td>
        <td className="d-none d-sm-block"  xs={3} sm={3} md={3} lg={3} >
          Author
        </td>
        <td xs={3} sm={3} md={3} lg={3} >Date</td>
      </tr>
    </thead>
  );
});

const TableBodyComponent = memo(({ data, onClick }) => {
  return (
    <tbody>
      {data.map((item, index) =>
        <TableRowComponent key={index} item={item} onClick={onClick} />
      )}
    </tbody>
  );
});

export default TableComponent;
