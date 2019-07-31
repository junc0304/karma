import React, { useState, useEffect, useReducer } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TableComponent from './board/Table.jsx';
import FormComponent from './board/Form.jsx';
import PaginationComponent from './board/Pagination.jsx';
import { pageReducer } from './board/PageReducer';
import  CreateButton  from './board/Button';
import { boardState, isEmpty } from '../helpers';
import { BOARD_TYPE } from '../config';

const Discussion = ({ data, getPosts, createPost, updatePost, deletePost, user }) => {
  let type = BOARD_TYPE.DISCUSSION.NAME;
  let isAllowed = BOARD_TYPE.DISCUSSION.EDIT.includes(!isEmpty(user) ? user.role.toUpperCase() : 'ADMIN');
  let initialState = boardState.getInitialPageState(data);

  useEffect(() => {
    const fetchPost = async () => await getPosts(type);
    fetchPost();
  }, []);

  const DiscussionBoard = () => {
    const [pageState, dispatch] = useReducer(pageReducer, initialState);
    const [row, setRow] = useState({ data: {}, show: false });

    const handleOpenForm = (data) => setRow({ data, show: true });
    const handleOpenEmptyForm = () => setRow({ data: {}, show: true });
    const handleCloseForm = () => setRow({ data: {}, show: false });

    return (

      <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: "rgba(255,255,255,0.8)" }}>
        <h3>{type}</h3>
        <CreateButton
          onClick={handleOpenEmptyForm}
          show={isAllowed}
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
          onClose={handleCloseForm}
          createPost={createPost}
          updatePost={updatePost}
          deletePost={deletePost}
          getPosts={getPosts}
          editable={isAllowed}
        />
        <PaginationComponent
          data={pageState}
          dispatch={dispatch}
        />
      </Jumbotron>

    )
  }
  return <DiscussionBoard />;
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.auth.user,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Discussion);