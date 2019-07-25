import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import TableComponent from './Table.jsx';
import PaginationComponent from './Pagination.jsx';
import FormComponent from './Form.jsx';
import {BoardContext} from './BoardContext.jsx';
import { isUserAdmin } from '../../helpers'
import * as actions from '../../actions';

import { PlusIcon} from '../icons'


import { BOARD_PROPERTY, USER_TYPE } from '../../config';
const { PAGE_SIZE, PAGINATION_SIZE } = BOARD_PROPERTY;

const Board = memo(({ getPosts, title, data, type, role }) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => await getPosts(type);
    fetchData();
  }, [getPosts, type]);


  useEffect(() => {
    console.log(data)
  })

  const handleCloseForm = () => setShowForm(false);
  const handleOpenForm = () => setShowForm(true);
  const handlePageChange = () => {
    
  }

  return (
    <BoardContext.Provider value = {data}>
      <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor:"rgba(255,255,255,0.8)" }}>
        <h3>
          {title}
          {isUserAdmin(role) && (
            <CreateButton onOpen={handleOpenForm} />
          )}
        </h3>
        <hr className="my-3" />
        <TableComponent
          data={data}
          page={currentPage} />
        <hr className="my-3" />
        <PaginationComponent
          dataSize={data.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage} />
        {isUserAdmin(role) && (
          <FormComponent
            data={data}
            show={showForm}
            onClose={handleCloseForm} 
          />
        )}
      </Jumbotron>
    </BoardContext.Provider>
  );
});

const CreateButton = memo(({ onOpen }) => {
  return (
    <div style={{ position: "relative" }}>
      <ButtonGroup
        style={{ 
          position: "absolute", right: "1px", bottom: "0px", 
          minHeight: "30px", minWidth: "30px" }}>
        <Button 
          size="sm"
          fontSize="large"
          variant="light"
          onClick={onOpen}
          style={{backgroundColor:"rgba(255,255,255,0)", border:"0px solid red"}}
          > <PlusIcon style={{textAlign:"center", verticalAlign:"middle"}}/></Button>
      </ButtonGroup>
    </div>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.auth.user,
    role: state.auth.user.role,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Board);
