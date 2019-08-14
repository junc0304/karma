import { AUTH_SIGN_UP, AUTH_SIGN_IN, AUTH_SIGN_OUT, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR, AUTH_REFRESH } from '../actions/types';
import { auth } from '../helpers';
const initialState = {
  user: {},
  isAdmin: false,
  isAuthenticated: false,
  signUpErrorMessage: '',
  signInErrorMessage: ''
}

const setAppStatus = (authentication, admin, userid) => {
  sessionStorage.setItem("app_status", JSON.stringify({ authentication, admin, userid }));
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP: {
      let isAdmin = auth.isAdmin(action.payload.role);
      setAppStatus(true, isAdmin, action.payload.userId);
      return { ...state, user: action.payload, isAdmin, isAuthenticated: true, signUpErrorMessage: '', signInErrorMessage: '' };
    }
    case AUTH_SIGN_IN: {
      let isAdmin = auth.isAdmin(action.payload.role);
      setAppStatus(true, isAdmin, action.payload.userId);
      return { ...state, user: action.payload, isAdmin, isAuthenticated: true, signUpErrorMessage: '', signInErrorMessage: '' };
    }
    case AUTH_SIGN_OUT: {
      sessionStorage.clear();
      return { user: {}, isAdmin: false, isAuthenticated: false, signUpErrorMessage: '', signInErrorMessage: '' };
    }
    case AUTH_SIGN_UP_ERROR: {
      sessionStorage.clear();
      return { ...state, signUpErrorMessage: action.payload, signInErrorMessage: '' };
    }
    case AUTH_SIGN_IN_ERROR: {
      sessionStorage.clear();
      return { ...state, signUpErrorMessage: '', signInErrorMessage: action.payload };
    }
    case AUTH_REFRESH: {
      return {
        user: { userId: action.payload.userId }, isAdmin: action.payload.isAdmin, isAuthenticated: action.payload.isAuth, signUpErrorMessage: '', signInErrorMessage: ''
      }
    }
    default:
      return state;
  }
}

export default authReducer;