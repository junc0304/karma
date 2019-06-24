import React from 'react';
import Board from './board/Board';
import { BOARD_TYPE } from '../config';

const Discussion = () => {

  return(
    <Board 
      title="Discussion"
      type={BOARD_TYPE.DISCUSSION} />
  );
}

export default Discussion;
