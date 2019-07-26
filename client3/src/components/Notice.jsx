import React from 'react';
import { connect } from 'react-redux'
import Board from './board/Board.jsx';
import * as actions from '../actions';
import { BOARD_TYPE } from '../config';

const Notice = () => {
  return(
    <Board 
      title="Notice"
      type={BOARD_TYPE.NOTICE}
    />
  );
}

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    auth: state.auth,
    post: state.post,
    user: state.user,
  };}

export default connect(mapStateToProps, actions)(Notice);
