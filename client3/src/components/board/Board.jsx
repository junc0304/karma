import React, { memo, useState, useEffect, useReducer, useRef } from 'react';
import { Jumbotron, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux'

import TableComponent from './Table.jsx';
//import PaginationComponent from './Pagination.jsx';
import FormComponent from './Form.jsx';
import { BoardContext } from './BoardContext.jsx';
import { isAdmin } from '../../helpers'
import * as actions from '../../actions';
import { pageReducer } from './PageReducer';
import { PlusIcon } from '../icons'
import { BOARD_PROPERTY, USER_TYPE } from '../../config';
const { PAGE_SIZE, PAGINATION_SIZE } = BOARD_PROPERTY;



function Board ( props/* { getPosts, title, data, type, role} */)  {

  const { getPosts, title, data, type, role } = props;
  const lastPage = Math.max(Math.ceil(data.length / PAGE_SIZE) , 1);
  const lastPageSet = Math.max(Math.ceil(lastPage / PAGINATION_SIZE), 1);
  const initialPageState = {
    page: { start: 1, current: 1, end: Math.min(PAGINATION_SIZE, lastPage)}, pageSet: 1,
    pageSize: PAGE_SIZE, pageSetSize: PAGINATION_SIZE, lastPage, lastPageSet
  };

  //above constants only resets when type is changed
  useEffect(() => { 
    let fetchData = async () => await getPosts(type);
    fetchData();
  }, [type]);

  const BoardView = (/* { title, data, role } */) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [pageState, dispatch] = useReducer(pageReducer, initialPageState);

    useEffect(() => {
      console.log(pageState);
    })

    const handleNextPage = () => dispatch({ type: 'nextPage' });
    const handlePrevPage = () => dispatch({ type: 'prevPage' });
    const handleNextPageSet = () => dispatch({ type: 'nextPageSet' });
    const handlePrevPageSet = () => dispatch({ type: 'prevPageSet' });
    const handleLastPage = () => dispatch({ type: 'lastPage' });
    const handleFirstPage = () => dispatch({ type: 'firstPage' });

    const handleCloseForm = () => setShowForm(false);
    const handleOpenForm = () => setShowForm(true);

    return (
      <BoardContext.Provider value={data}>
        <Jumbotron style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: "rgba(255,255,255,0.8)" }}>
          <h3>
            <Button onClick={handleNextPage}>aa</Button>
            <Button onClick={handlePrevPage}>bb</Button>
            {title}
            {isAdmin(role) && (
              <CreateButton onOpen={handleOpenForm} />
            )}
          </h3>
          <hr className="my-3" />
          <TableComponent
            data={data}
            page={currentPage} />
          <hr className="my-3" />
         {/*  <PaginationComponent
            dataSize={data.length}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          /> */}
          
          {isAdmin(role) && (
            <FormComponent
              data={data}
              show={showForm}
              onClose={handleCloseForm}
            />
          )}
        </Jumbotron>
      </BoardContext.Provider>
    );
  }
  return <BoardView {...props} />
}

const PaginationComponent = () => {

  
}

const CreateButton = memo(({ onOpen }) => {
  return (
    <div style={{ position: "relative" }}>
      <ButtonGroup
        style={{
          position: "absolute", right: "1px", bottom: "0px",
          minHeight: "30px", minWidth: "30px"
        }}>
        <Button
          size="sm"
          fontSize="large"
          variant="light"
          onClick={onOpen}
          style={{ backgroundColor: "rgba(255,255,255,0)", border: "0px solid red" }}
        >
          <PlusIcon style={{ textAlign: "center", verticalAlign: "middle" }} /></Button>
      </ButtonGroup>
    </div>
  );

});

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    role: state.auth.user.role,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Board);
