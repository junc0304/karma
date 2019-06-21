import React, { memo, useState, useEffect } from 'react';
import { Table, Jumbotron, Container, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'

import Pagination from './Board.Pagination';
import TableBody from './Board.TableBody';
import EditButtonComponent from './Board.CreateButton';
import BoardForm from './Board.Form';
import SelectedRow from './Board.Row';
import * as actions from '../../actions';

import { BOARD_PROPERTY ,USER_TYPE} from '../../config';

const { PAGE_SIZE, PAGINATION_SIZE } = BOARD_PROPERTY;

const Board = memo(({
  getPosts, createPost, updatePost, getComments, //actions
  post: { data },                   //store
  title, type, role = "ADMIN" }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const isAdmin = role === USER_TYPE.ADMIN;
  const [showRow, setShowRow] = useState(false);
  const [row, setRow] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      await getPosts(type); }
    fetchData();
  }, []);

  const onRowClick = async (item) => {
    //await getComments(item);
    setRow(item);
    setShowRow(true);
  }

  const onSubmit = async (formData) => {
    console.log(formData)
    await createPost({ ...formData, type });
    await getPosts(type);
  }

  const onSubmitEdit = async (formData) => {
    console.log(formData)
    await createPost({ ...formData, type });
    await getPosts(type);
  }

  return (
    <Container>
      <Jumbotron style={{ wordWrap: "break-word" }}>
        <h1 className="display-4">
          {title}
          {isAdmin &&
            <EditButtonComponent
              setShow={setShowForm} />}</h1>
        <hr className="my-3" />
        <Table variant="light">
          <thead>
            <tr className="d-flex text-center" >
              <th className="col-1 d-none d-sm-block">
                #</th>
              <th className="col-6 ">
                Title</th>
              <th className="col-3 ">
                Date</th>
              <th className="col-2 d-none d-sm-block">
                By</th>
            </tr>
          </thead>
          <TableBody
            data={data}
            pageSize={PAGE_SIZE}
            onClick={onRowClick}
            currentPage={currentPage} />
        </Table>
        <hr className="my-3" />
        <Pagination
          dataSize={data.length}
          pageSize={PAGE_SIZE}
          paginationSize={PAGINATION_SIZE}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
      </Jumbotron>
      { isAdmin &&
        <BoardForm
          data={data}
          show={showForm}
          setShow={setShowForm}
          onSubmit={onSubmit} /> }
      { <SelectedRow 
          data={row}
          show={showRow}
          setShow={setShowRow}
          onSubmit={onSubmitEdit} /> }
    </Container>
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
