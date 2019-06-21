import React, { useState } from 'react';
import Board from './board/Board';
import { BOARD_TYPE } from '../config';

const Discussion = ({ board, getPosts }) => {

  return(
    <Board 
      title="Discussion"
      type={BOARD_TYPE.DISCUSSION} />
  );
}

export default Discussion;


/* import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Board from './board/Board';
import * as actions from '../actions';

const Discussion = ({board, getPosts}) => {
  const [data, setData] = useState([]);

  //server => state
  useEffect(() => {
    const fetchData = async () => {
      await getPosts("DISCUSSION");
    }
    fetchData();
  }, [getPosts]);

  //props => state
  useEffect(() => {
    setData(board.data);
  }, [board.data]);

  return(
    <Board 
      title={'Discussion'}
      data={data}
      setData={setData} />
  );
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    auth: state.auth,
    board: state.board,
    user: state.user,
  };}

export default connect(mapStateToProps, actions)(Discussion);
 */