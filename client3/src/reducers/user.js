import { USER_GET, USER_UPDATE, USER_DELETE, USER_ERROR } from '../actions/types';

const initialState = {
  userId: '',
  userName: '',
  userRole: '',
  errorMessage: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_GET:
      return { ...state, userId: action.payload.id , userName: action.payload.name, userRole:action.payload.role, errorMessage: '' };
    case USER_UPDATE:
      return { ...state, errorMessage: '' };
    case USER_DELETE:
      return { ...state, errorMessage: '' };
    case USER_ERROR:
        return { ...state, errorMessage: payload.error };
    default:
      return state;
  }
}

export default authReducer;