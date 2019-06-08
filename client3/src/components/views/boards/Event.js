import React, { memo, useEffect, useState } from 'react';
import { Table, Jumbotron, Pagination, Button, Container } from 'react-bootstrap';
import { useSelect } from 'react-redux'
import { connect } from 'react-redux';
import * as actions from '../../../actions';

const ButtonSet = ({ role }) => {
  return (
    <Button>

    </Button>
  )
}

const ButtonStatus = (props) => {

}

const TableBody = memo(({ data, currentPage }) => {
  const [tableRows, setTableRows] = useState([]);
  useEffect(() => {
    const fetchRows = () => setTableRows(
      Object.keys(data).map((item, index) =>
        <tr>
          <td key={index}>{item.index}</td>
          <td key={index}>{item.title}</td>
          <td key={index}>{item.authorName}</td>
          <td key={index}>{item.createdOn}</td>
        </tr>
      ));
  }, [data, currentPage])
  return tableRows;
});

const PaginationComponent = memo(({ data, currentPage, setCurrentPage }) => {
  const pageCount = data.length;

  let items = [];
  for (let i = 1; i < Math.ceil(data.length / 10); i++) {
    items.push(
      <Pagination.Item key={i} active={i === currentPage} onClick={setCurrentPage(i)}>
        {i}
      </Pagination.Item>
    )
  }
  return (
    <Pagination variant="light" size="sm" className="justify-content-center">
      <Pagination.First onClick={setCurrentPage(1)} />
      <Pagination.Prev onClick={setCurrentPage(currentPage - 1)} />
      {items}
      <Pagination.Next onClick={setCurrentPage(currentPage + 1)} />
      <Pagination.Last onClick={setCurrentPage(pageCount)} />
    </Pagination>
  )
});

const EventBoard = (props) => {
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  const [currentData, setCurrentData] = useState();
  const numOfPages = data.length;

  //data<-->page
  useEffect(() => {
    setCurrentData(data.slice(
      page * parseInt(itemsPerPage, 0),
      (page + 1) * parseInt(itemsPerPage, 0)
    ));
  },[page, data]);

  //get data
  useEffect(() => {
    const fetchData = async () => {
      setData(props.getPosts(props.type));
    }
  });

  useEffect(() => {
   setTableRows(
      Object.keys(data).map((item, index) =>
        <tr>
          <td key={index}>{item.index}</td>
          <td key={index}>{item.title}</td>
          <td key={index}>{item.authorName}</td>
          <td key={index}>{item.createdOn}</td>
        </tr>
      ));
  }, [currentData])


  let numberOfPageSets = Math.ceil(data.length / itemsPerPageSet);
  let setItems = data.slice(currentPageSet * parseInt(itemsPerPageSet, 0), (currentPageSet + 1) * parseInt(itemsPerPageSet, 0));

  return (
    <Jumbotron>
      <Container>
        <h1>Events</h1>
        <Table variant="light">
          <thead>
            <tr>
              <th className="col1 auto" >#</th>
              <th className="col2 w-50">Title</th>
              <th className="col3 w-25">Date</th>
              <th className="col4 auto">By</th>
            </tr>
          </thead>
          <TableBody
            data={data} />
        </Table>

        <Pagination variant="light" size="md" className="justify-content-center">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Ellipsis />
          {setItems.map((page) =>
            <Pagination.Item className="page-item"
              style={{ minWidth: '26px' }}
              onClick={() => { setPage(page) }}>
              <a className="page-link" style={{ color: "black" }} href="#">{page + 1}</a>
            </Pagination.Item>)}
          <Pagination.Ellipsis />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>

        {/* <PaginationComponent data={props.board.data} /> */}
      </Container>
    </Jumbotron>
  );
}

function mapStateToProps(state) {
  console.log('state', state);
  return {
    auth: state.auth,
    board: state.board,
    user: state.user,
  }
}

export default connect(mapStateToProps, actions)(EventBoard);