import { GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, POST_ERROR, RESET_POST } from '../actions/types';
import { BOARD_TYPE } from '../config';

const initialState = {
  type: '',         //board type
  data: {},         //board data
  errorMessage: ''  //error message
}

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    //board get actions
    case GET_POST.MEETING: 
      return { ...state, type: BOARD_TYPE.MEETING, data: action.payload.post, errorMessage: '' };   
    case GET_POST.EVENT: 
      return { ...state, type: BOARD_TYPE.EVENT, data: action.payload.post, errorMessage: '' };   
    case GET_POST.NOTICE: 
      return { ...state, type: BOARD_TYPE.NOTICE, data: action.payload.post, errorMessage: '' };   
    case GET_POST.DISCUSSION: 
      return { ...state, type: BOARD_TYPE.DISCUSSION, data: action.payload.post, errorMessage: '' };   
    //create update delete reset actions
    case CREATE_POST:
      return { ...state, errorMessage: '' };
    case UPDATE_POST:
      return { ...state, errorMessage: '' };
    case DELETE_POST:
      return { ...state, errorMessage: '' };
    case RESET_POST:
      return { ...state, type:'', data:'', errorMessage:''};
    //error action
    case POST_ERROR:
      return { ...state, errorMessage: action.payload.error };
    default:
      return state;
  }
}

export default postReducer;