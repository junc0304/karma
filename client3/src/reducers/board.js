import { BOARD_GET_MEETING, BOARD_GET_EVENT, BOARD_GET_NOTICE, BOARD_GET_FREECHAT, BOARD_POST_DATA, BOARD_UPDATE_DATA, BOARD_DELETE_DATA, BOARD_ERROR } from '../actions/types';
import { BOARD_TYPE } from '../config';
const { EVENT, MEETING, FREECHAT, NOTICE } = BOARD_TYPE;

const initialState = {
  type: '',         //board type
  data: {},         //board data
  errorMessage: ''  //error message
}

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    //board get actions
    case BOARD_GET_MEETING:
      return { ...state, type: MEETING, data: action.payload.data, errorMessage: '' };
    case BOARD_GET_EVENT:
      return { ...state, type: EVENT, data: action.payload.data, errorMessage: '' };
    case BOARD_GET_NOTICE:
      return { ...state, type: NOTICE, data: action.payload.data, errorMessage: '' };
    case BOARD_GET_FREECHAT:
      return { ...state, type: FREECHAT, data: action.payload.data, errorMessage: '' };
    //common actions
    case BOARD_POST_DATA:
      return { ...state, errorMessage: '' };
    case BOARD_UPDATE_DATA:
      return { ...state, errorMessage: '' };
    case BOARD_DELETE_DATA:
      return { ...state, errorMessage: '' };
    case BOARD_ERROR:
      return { ...state, errorMessage: '' }
    default:
      return state;
  }
}

export default boardReducer;