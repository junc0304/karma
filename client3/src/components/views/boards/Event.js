import React, { memo, useEffect, useState } from 'react';
import { Table, Jumbotron, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

import Pagination from './Pagination';
import TableBody from './TableBody';

import { BOARD_PROPERTY } from '../../../config';
const {PAGE_SIZE, PAGINATION_SIZE} = BOARD_PROPERTY
//import from config later
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

const EventBoard = memo(
  (props) => {
    const itemsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(1);
    const [data, setData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        setData(items); //test
        //setData(await props.getPosts(props.type));
      }
      fetchData();
    }, [data]);

    console.log(data);
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
              data={data}
              pageSize={PAGE_SIZE}
              currentPage={currentPage} />
          </Table>
          {/** pageSize, dataSize = 13, currentPage = 1, setCurrentPage */}~
          <Pagination
            dataSize={data.length}
            pageSize={PAGE_SIZE}
            paginationSize={PAGINATION_SIZE}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            />
        </Container>
      </Jumbotron>
    );
  });

function mapStateToProps(state) {
  console.log('state', state);
  return {
    auth: state.auth,
    board: state.board,
    user: state.user,
  };
}

export default connect(mapStateToProps, actions)(EventBoard);