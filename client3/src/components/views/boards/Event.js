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

//import from config later
const PAGES_PER_SET = 5;
const ITEMS_PER_PAGE = 10;

const Paginator = memo(({ data }) => {

  const pageCount = Math.ceil(data.length/ITEMS_PER_PAGE); //totalPage count
  const pageSetCount = Math.ceil(pageCount/PAGES_PER_SET); //totalPageSet count

  const [currentPage, setCurrentPage] = useState(1);        // currentPage
  const [currentPageSet, setCurrentPageSet] = useState(1);   //currentPageSet
  const [showLeftEllipsis, setShowLeftEllipsis] = useState(1);
  const [showRightllipsis, setShowRightEllipsis] = useState(1);

  const pageData = [];

  useEffect(() => {
    const fetchPages = () => {
      let firtItem = Math.floor(currentPage/ITEMS_PER_PAGE+1)+1;
      let lastItem = firtItem + PAGES_PER_SET -1 ;
      for(let i = firtItem; i <=lastItem; i++) {
        pageData.push(
          <Pagination.Item key={i} active={i===currentPage} onClick={setCurrentPage(i)} />
        )
      }
    }
    fetchPages();
  }, [currentPage])
  
  return (
    <Pagination variant="light" size="sm" className="justify-content-center">
      <Pagination.First onClick={() => setCurrentPage(1)} />
      <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
      <Pagination.Ellipsis onClick={() => setCurrentPageSet(currentPageSet -1)} />
      {pageData}
      <Pagination.Ellipsis onClick={() => setCurrentPageSet(currentPageSet +1)} />
      <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
      <Pagination.Last onClick={() => setCurrentPage(pageCount)} />
    </Pagination>
  )
});

const EventBoard = (props) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [data, setData] = useState(props.board.data);
  //data<-->page

  useEffect(() => {
    const fetchPage =() =>  setCurrentData(data.slice(
      currentPage * parseInt(itemsPerPage, 0),
      (currentPage + 1) * parseInt(itemsPerPage, 0)
    ));
  },[currentPage, data]);

  //get data
  useEffect(() => {
    const fetchData =  async () => {
      setData(props.getPosts(props.type));
    }
  });

  
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

        <Paginator data= {data} />
        {/* 
        <Pagination variant="light" size="md" className="justify-content-center">
          <Pagination.First />
          <Pagination.Prev />
          <Pagination.Ellipsis />
         
           
          <Pagination.Ellipsis />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>

       <PaginationComponent data={props.board.data} /> */}
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