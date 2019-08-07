import { GET_USER, UPDATE_USER, RESET_USER, USER_ERROR } from '../actions/types';

const initialState = {
  data: {},
  errorMessage: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, data: action.payload.user, errorMessage: '' };
    case UPDATE_USER:
      return { ...state, errorMessage: '' };
    case RESET_USER:
      return { data: {}, errorMessage: ''};
    case USER_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default userReducer;