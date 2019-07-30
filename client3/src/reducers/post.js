import { GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, POST_ERROR, RESET_POST, SET_CURRENT_POST, RESET_CURRENT_POST, SET_NEW_POST } from '../actions/types';
import { BOARD_TYPE } from '../config';

const initialState = {
  type: '',         //board type
  data: {},         //board data
  currentPost: { data:{}, show:false },  //selected data
  errorMessage: ''  //error message
}

const postReducer = (state = initialState, action) => {
  console.log(action) 
  switch (action.type) {
    //board get actions
    case GET_POST.MEETING: 
      return { ...state, type: BOARD_TYPE.MEETING.NAME, data: action.payload.post, currentPost:{}, errorMessage: '' };   
    case GET_POST.EVENT: 
      return { ...state, type: BOARD_TYPE.EVENT.NAME, data: action.payload.post,  currentPost:{}, errorMessage: '' };   
    case GET_POST.NOTICE:
      return { ...state, type: BOARD_TYPE.NOTICE.NAME, data: action.payload.post,  currentPost:{}, errorMessage: '' };   
    case GET_POST.DISCUSSION: 
      return { ...state, type: BOARD_TYPE.DISCUSSION.NAME, data: action.payload.post,  currentPost:{}, errorMessage: '' };
    case SET_CURRENT_POST:
      return {...state, currentPost:{ data: action.payload, show: true }};
    case RESET_CURRENT_POST:
      return {...state, currentPost:{ data:{}, show: false}};   
    case SET_NEW_POST:
      return {...state, currentPost:{ data:{}, show: true}};
    //create update delete reset actions
    case CREATE_POST:
      return { ...state, errorMessage: '' };
    case UPDATE_POST:
      return { ...state, errorMessage: '' };
    case DELETE_POST:
      return { ...state, errorMessage: '' };
    case RESET_POST:
      return { ...state, type:'', data:{}, errorMessage:''};
    //error action
    case POST_ERROR:
      return { ...state, errorMessage: action.payload.error };
    default:
      return state;
  }
}

export default postReducer;