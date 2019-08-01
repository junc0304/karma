import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import BoardComponent from './board/Board';
import { BOARD_TYPE } from '../config';

const Meeting = () => {
    return (
      <BoardComponent type={BOARD_TYPE.MEETING.NAME} />
    )
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    user: state.auth.user,
    data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(Meeting);