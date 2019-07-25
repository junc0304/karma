import React from 'react';
import Board from './board/Board.jsx';
import { BOARD_TYPE } from '../config';

const Meeting = () => {

  return(
    <Board 
      title={'Meeting'}
      type={BOARD_TYPE.MEETING} />
  );
}

export default Meeting;
