import React, { useState, useEffect, useReducer, memo } from 'react';
import { Jumbotron } from 'react-bootstrap';

import { connect } from 'react-redux';
import * as actions from '../actions';

import TableComponent from './Table.jsx';
import FormComponent from './Form2.jsx';
import PaginationComponent from './Pagination.jsx';
import CreateButton from './Button';

import { pageReducer } from './PageReducer';
import { boardState, isEmpty } from '../helpers';
import { BOARD_TYPE } from '../config';
import './Board.css'


const Board = memo(({
  //from parent
  type,
  //from store
  data, user,
  //from action
  getPosts, getComments, resetComments
}) => {
  let currentUser = user.toUpperCase();
  let boardType = BOARD_TYPE[type.toUpperCase()];
  let isUserAuthorized = boardType.USER.includes(currentUser);
  let initialState = boardState.getInitialPageState(data);

  useEffect(() => {
    const fetchPost = async () => await getPosts(type);
    fetchPost();
  }, []);

  const [row, setRow] = useState({ data: {}, show: false });
  const [pageState, dispatch] = useReducer(pageReducer, initialState);

  const handleOpenForm = async (data) => [await getComments({ postId: data.postId }), setRow({ data, show: true })];
  const handleOpenEmptyForm = async () => [await resetComments(), setRow({ data: {}, show: true })];
  const handleCloseForm = async () => [await resetComments(), setRow({ data: {}, show: false })];

  return (

    <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: "rgba(255,255,255,0.8)" }}>
      <h3>{type}</h3>
      <CreateButton
        onClick={handleOpenEmptyForm}
        show={false}
      />
      <hr className="my-3" />
      <TableComponent
        data={data}
        pageState={pageState}
        onClick={handleOpenForm}
      />
      <FormComponent
        type={type}
        data={row.data}
        show={row.show}
        access={isUserAuthorized}
        onClose={handleCloseForm}
      />
      <PaginationComponent
        data={pageState}
        dispatch={dispatch}
      />
    </Jumbotron>
  )
});

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.auth.user,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Board);