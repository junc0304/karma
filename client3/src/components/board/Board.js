import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import TableComponent from './Table';
import PaginationComponent from './Pagination';
import FormComponent from './Form';
import * as actions from '../../actions';

import { BOARD_PROPERTY, USER_TYPE } from '../../config';
const { PAGE_SIZE, PAGINATION_SIZE } = BOARD_PROPERTY;

const Board = memo(({ getPosts, title, post, type, role = "ADMIN" }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = role === USER_TYPE.ADMIN;

  useEffect(() => {
    const fetchData = async () => {
      await getPosts(type);
    }
    fetchData();
  }, [getPosts, type]);

  return (
      <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px" }}>
        <h1 className="display-4">
          {title}
          {isAdmin &&
          <CreateButton
            setShow={setShowForm} />}
        </h1>
        <hr className="my-3" />
        <TableComponent
          data={post.data}
          pageSize={PAGE_SIZE}
          currentPage={currentPage} />
        <hr className="my-3" />
        <PaginationComponent
          dataSize={post.data.length}
          pageSize={PAGE_SIZE}
          paginationSize={PAGINATION_SIZE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
        {isAdmin &&
        <FormComponent
          data={post.data}
          type={type}
          show={showForm}
          setShow={setShowForm} />}
      </Jumbotron>
     
  );
});

const CreateButton = memo(({ setShow }) => {
  return (
    <div style={{ position: "relative" }}>
      <ButtonGroup
        style={{ 
          position: "absolute", right: "1px", bottom: "0px", 
          minHeight: "35px", minWidth: "35px" }}>
        <Button
          variant="light"
          onClick={()=>setShow(true)}>
          +</Button>
      </ButtonGroup>
    </div>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    post: state.post,
  };
}

export default connect(mapStateToProps, actions)(Board);
