import { GET_MEMBER, UPDATE_MEMBER, MEMBER_ERROR, RESET_MEMBER } from '../actions/types';

const initialState = {
  data: [],
  errorMessage: ''
}

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MEMBER:
      return { ...state, data: action.payload.user , errorMessage: '' };
    case UPDATE_MEMBER:
      return { ...state, data: action.payload.user , errorMessage: '' };
    case RESET_MEMBER:
      return { ...state, data:{}, errorMessage: ''};
    case MEMBER_ERROR:
      return { ...state, errorMessage: action.payload.error };
    default:
      return state;
  }
}

export default memberReducer;