import React from 'react';
import Board from './board/Board.jsx';
import { BOARD_TYPE } from '../config';

const Event = () => {

  return (
    <Board 
      title="Event"
      type={BOARD_TYPE.EVENT} 
    />
  );
}

export default Event;