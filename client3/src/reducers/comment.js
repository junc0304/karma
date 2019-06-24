import { GET_COMMENT, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, COMMENT_ERROR, RESET_COMMENT } from '../actions/types';

const initialState = {
  postId: '',
  data: [],         //comment data
  errorMessage: ''  //error message
}

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    //board get actions
    case GET_COMMENT:
      return { ...state, postId: action.payload.comment.postId, data: action.payload.comment, errorMessage: '' };
    case CREATE_COMMENT:
      return { ...state, errorMessage: '' };
    case UPDATE_COMMENT:
      return { ...state, errorMessage: '' };
    case DELETE_COMMENT:
      return { ...state, errorMessage: '' };
    case RESET_COMMENT:
      return { ...state, type: '', data: {}};
    case COMMENT_ERROR:
      return { ...state, errorMessage: '' }
    default:
      return state;
  }
}

export default commentReducer;