import { MEMBER_GET_LIST, MEMBER_UPDATE, MEMBER_ERROR } from '../actions/types';

const initialState = {
  data: [],
  errorMessage: ''
}

const memberReducer = (state = initialState, action) => {
  switch (action.type) {
    case MEMBER_GET_LIST:
      return { ...state, data: action.payload.users , errorMessage: '' };
    case MEMBER_UPDATE:
      return { ...state, data: action.payload.users , errorMessage: '' };
    case MEMBER_ERROR:
      return { ...state, errorMessage: action.payload.message };
    default:
      return state;
  }
}

export default memberReducer;