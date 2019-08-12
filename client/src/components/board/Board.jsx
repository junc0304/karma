import React, { useState, useReducer, memo } from 'react';
import { Jumbotron } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../../actions';

import TableComponent from './Table.jsx';
import FormComponent from './Form.jsx';
import PaginationComponent from './Pagination.jsx';
import CreateButton from './Button';

import { pageReducer } from './PageReducer';
import { boardState } from '../../helpers';
import { JUMBOTRON_BG_COMMON } from '../../config';
import './Board.css';

const Board = memo(({
  type, hasAccess,  //from parent
  data, isAdmin, //from store
  getComments, resetComments  //from action
}) => {
  let initialState = boardState.getInitialPageState(data);

  const BoardView = () => {
    const [row, setRow] = useState({ data: {}, show: false });
    const [pageState, dispatch] = useReducer(pageReducer, initialState);

    const handleOpenForm = async (data) => [await getComments({ postId: data.postId }), setRow({ data, show: true })];
    const handleOpenEmptyForm = async () => [await resetComments(), setRow({ data: {}, show: true })];
    const handleCloseForm = async () => [await resetComments(), setRow({ data: {}, show: false})];

    return (
      <Jumbotron className='jumbotron-main' style={{ wordWrap: 'break-word', padding: '15px 15px', backgroundColor: JUMBOTRON_BG_COMMON }}>
        <div className='jumbotron-inner-frame' >
          <h1 style={{ fontSize: '2rem' }} >
            {type}
            <CreateButton
              onClick={handleOpenEmptyForm}
              show={hasAccess || isAdmin}
            />
          </h1>
          <hr className='my-3' />
          <TableComponent
            data={data}
            pageState={pageState}
            onClick={handleOpenForm}
          />
          <hr className='my-3' />
          <FormComponent
            type={type}
            data={row.data}
            show={row.show}
            access={hasAccess || isAdmin}
            onClose={handleCloseForm}
          />
          <PaginationComponent
            data={pageState}
            dispatch={dispatch}
          />
        </div>
      </Jumbotron>
    )
  }
  return <BoardView />
});

const mapStateToProps = (state) => {
  return {
    data: state.post.data,
    isAdmin: state.auth.isAdmin
  };
}

export default connect(mapStateToProps, actions)(Board);