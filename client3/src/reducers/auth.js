import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_ERROR, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR } from '../actions/types';

const initialState = {
  user: {},
  isAuthenticated: false,
  signUpErrorMessage: '',
  signInErrorMessage: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return { ...state, user: action.payload, isAuthenticated: true, signUpErrorMessage: '', signInErrorMessage: '' };
    case AUTH_SIGN_IN:
      console.log(action)
      return { ...state, user: action.payload, isAuthenticated: true, signUpErrorMessage: '', signInErrorMessage: '' };
    case AUTH_SIGN_OUT:
      return { ...state, user: {}, isAuthenticated: false, signUpErrorMessage: '', signInErrorMessage: '' };
    case AUTH_SIGN_UP_ERROR:
      return { ...state, signUpErrorMessage: action.payload, signInErrorMessage: '' };
    case AUTH_SIGN_IN_ERROR:
      return { ...state, signUpErrorMessage: '', signInErrorMessage: action.payload };
    default:
      return state;
  }
}

export default authReducer;