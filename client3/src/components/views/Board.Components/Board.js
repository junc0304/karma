import React, { memo, useEffect, useState } from 'react';
import { Table, Jumbotron, Container } from 'react-bootstrap';
import { connect } from 'react-redux'

import * as actions from '../../../actions';
import Pagination from './Board.Pagination';
import TableBody from './Board.TableBody';
import EditButtonComponent from './Board.MenuButton';
import { BOARD_PROPERTY } from '../../../config';

const { PAGE_SIZE, PAGINATION_SIZE } = BOARD_PROPERTY
const Board = memo(
  ({ title, data, setData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
      <Jumbotron>
        <Container>
          <EditButtonComponent />
          <h1 className="display-4">{title}</h1>
          <hr className="my-3" />
          <Table variant="light">
            <thead>
              <tr>
                <th className="col1 auto">#</th>
                <th className="col2 w-75">Title</th>
                <th className="col3 auto">Date</th>
                <th className="col4 auto">By</th>
              </tr>
            </thead>
            <TableBody
              data={data}
              pageSize={PAGE_SIZE}
              currentPage={currentPage} />
          </Table>
          {/** pageSize, dataSize = 13, currentPage = 1, setCurrentPage */}
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

export default Board;