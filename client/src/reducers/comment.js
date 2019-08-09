import { GET_COMMENT, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, COMMENT_ERROR, RESET_COMMENT } from '../actions/types';

const initialState = {
  postId: '',
  data: [],         
  errorMessage: ''  
}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMENT:
      return { ...state, postId: action.payload.postId , data: action.payload.comment, errorMessage: '' };
    case CREATE_COMMENT:
      return { ...state, errorMessage: '' };
    case UPDATE_COMMENT:
      return { ...state, errorMessage: '' };
    case DELETE_COMMENT:
      return { ...state, errorMessage: '' };
    case RESET_COMMENT:
      return { ...state, postId:'', data: [] };
    case COMMENT_ERROR:
      return { ...state, errorMessage: '' }
    default:
      return state;
  }
}

export default commentReducer;