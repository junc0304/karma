import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Board from './Board.Components/Board';
import * as actions from '../../actions';

const Notice = ({ board, getPosts }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await getPosts("NOTICE");
    }
   fetchData();
  }, [getPosts]);

  useEffect(() => {
   setData(board.data);
  }, [board.data]);

  return(
    <Board 
      title={'Notice'}
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

export default connect(mapStateToProps, actions)(Notice);
