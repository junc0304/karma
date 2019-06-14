import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR } from '../actions/types';

const initialState = {
  role: 'guest',
  isAuthenticated: false,
  errorMessage: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return { ...state, role: action.payload.role, isAuthenticated: true, errorMessage: '' };
    case AUTH_SIGN_IN:
      return { ...state, role: action.payload.role, isAuthenticated: true, errorMessage: '' };
    case AUTH_SIGN_OUT:
      return { ...state, role: 'guest', isAuthenticated: false, errorMessage: '' };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

export default authReducer;