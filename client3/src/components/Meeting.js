import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Board from './board/Board';
import * as actions from '../actions';
import { BOARD_TYPE } from '../config';

const Meeting = ({ board ,getPosts }) => {
  const [data, setData] = useState([]);
  //reducer => store
  /* useEffect(() => {
    const fetchData = async () => await getPosts("MEETING");
    fetchData();
  }, [getPosts]);
  //store => state
  useEffect(() => {
    setData(board.data);
  }, [board.data]);
 */
  return(
    <Board 
      title={'Meeting'}
      type={BOARD_TYPE.MEETING}
      setData={setData} />
  );
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    board: state.board,
  };
}

export default connect(mapStateToProps, actions)(Meeting);
