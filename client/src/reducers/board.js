import {
    BOARD_GET_MEETING,
    BOARD_POST_MEETING, 
    BOARD_PUT_MEETING, 
    BOARD_DELETE_MEETING,  

    BOARD_GET_EVENT, 
    BOARD_POST_EVENT, 
    BOARD_PUT_EVENT, 
    BOARD_DELETE_EVENT, 

    BOARD_GET_NOTICE, 
    BOARD_POST_NOTICE, 
    BOARD_PUT_NOTICE, 
    BOARD_DELETE_NOTICE, 
  
    BOARD_GET_RANDOM,
    BOARD_POST_RANDOM,
    BOARD_PUT_RANDOM,
    BOARD_DELETE_RANDOM,
    } from '../actions/types';

import {BOARD_TYPE} from '../configuration'
import Board from '../components/screens/Board';


const DEFAULT_STATE = {
    type: '',
    data: '',
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case BOARD_GET_EVENT:
            return {...state, type: BOARD_TYPE.EVENT, data: action.payload}
        case BOARD_GET_NOTICE:
            return {...state, type: BOARD_TYPE.NOTICE, data: action.payload}
        case BOARD_GET_MEETING:
            return {...state, type: BOARD_TYPE.MEETING, data: action.payload}
        case BOARD_GET_RANDOM:
            return {...state, type: BOARD_TYPE.RANDOM, data: action.payload}
        default:
            return state
    }
}