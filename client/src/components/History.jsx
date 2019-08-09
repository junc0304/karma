import React, { useEffect, memo, useReducer } from 'react';
import { Jumbotron, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../actions';
import TableComponent from './history/Table';
import FormComponent from './history/Form';
import { PlusIcon } from './icons';
import historyReducer from './history/HistoryReducer';
import './history/History.css';

const History = memo(({
  data, getHistory, isAdmin
}) => {
  const initialState = { data: {}, show: false, edit: false };
  const [row, dispatch] = useReducer(historyReducer, initialState);

  //fetchData
  useEffect(() => {
    const fetchData = async () => await getHistory();
    fetchData();
  }, [getHistory]);

  const handleOpenEmpty = () => dispatch({ type: 'new' });
  const handleOpen = (data) => dispatch({ type: 'open', data });
  const handleClose = () => dispatch({ type: 'close' });
  const handleEdit = () => dispatch({ type: 'edit' });

  return (
    <Jumbotron
      className='jumbotron-main'
      style={{
        wordWrap: 'break-word',
        padding: '15px 15px',
        backgroundColor: 'rgba(255,255,255,0.8)'
      }}
    >
      <div className='jumbotron-inner-frame' >
      <h1 style={{fontSize:'2rem'}} >
        History
        {isAdmin &&
            <CreateButton
              onClick={handleOpenEmpty}
            />}</h1>
        <hr className='my-2' />
        <TableComponent
          data={data}
          onClick={handleOpen}
        />
        <FormComponent
          data={row.data}
          show={row.show}
          edit={row.edit}
          onChangeEdit={handleEdit}
          onClose={handleClose}
        />
      </div>
    </Jumbotron>
  );
});

const CreateButton = memo(({ onClick }) => {
  return (
    <div style={{ position: 'relative' }}>
      <ButtonGroup style={{ position: 'absolute', right: '1px', bottom: '0px', minHeight: '30px', minWidth: '30px' }} >
        <Button
          size='sm'
          fontSize='large'
          variant='light'
          onClick={onClick}
          style={{ backgroundColor: 'rgba(255,255,255,0)', border: '0px' }}
        >
          <PlusIcon style={{ textAlign: 'center', verticalAlign: 'middle' }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const mapStateToProps = (state) => {
  return {
    data: state.history.data,
    isAdmin: state.auth.isAdmin,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(History);