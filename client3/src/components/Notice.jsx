import React, { useState, useEffect, useReducer, memo } from 'react';
import { Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';
import TableComponent from './board/Table.jsx';
import FormComponent from './board/Form2.jsx';
import PaginationComponent from './board/Pagination.jsx';
import { pageReducer } from './board/PageReducer';
import CreateButton  from './board/Button';
import { boardState, isEmpty } from '../helpers';
import { BOARD_TYPE , JUMBOTRON_BG_COMMON } from '../config';

const Notice = memo(({
  //from store
  data, user,
  //from action
  getPosts, getComments, resetComments
}) => {

  let type = BOARD_TYPE.NOTICE.NAME;
  let isAllowed = BOARD_TYPE.NOTICE.EDIT.includes(!isEmpty(user) ? user.role.toUpperCase() : '');
  let initialState = boardState.getInitialPageState(data);

  useEffect(() => {
    const fetchPost = async () => await getPosts(type);
    fetchPost();
  }, []);

  const View = () => {
  const [row, setRow] = useState({ data: {}, show: false });
  const [pageState, dispatch] = useReducer(pageReducer, initialState);

  const handleOpenForm = async (data) => [await getComments({ postId: data.postId }), setRow({ data, show: true })];
  const handleOpenEmptyForm = () => [resetComments() ,setRow({ data: {}, show: true })];
  const handleCloseForm = () => [resetComments(), setRow({ data: {}, show: false })];

  return (

    <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: JUMBOTRON_BG_COMMON }}>
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
        editable={isAllowed}
        rowId={row.data.postId}
      />
      <hr className="my-3" />
      <PaginationComponent
        data={pageState}
        dispatch={dispatch}
      />
    </Jumbotron>
  )
}
return <View />
});

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Notice);