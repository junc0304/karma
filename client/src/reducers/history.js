import { GET_HISTORY, CREATE_HISTORY, UPDATE_HISTORY, DELETE_HISTORY, HISTORY_ERROR } from '../actions/types';

const initialState = {
  type: '',         //board type
  data: {},         //board data
  errorMessage: ''  //error message
}

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_HISTORY:
      return {...state, data: action.payload.history}
    //create update delete reset actions
    case CREATE_HISTORY:
      return { ...state, errorMessage: '' };
    case UPDATE_HISTORY:
      return { ...state, errorMessage: '' };
    case DELETE_HISTORY:
      return { ...state, errorMessage: '' };
    //error action
    case HISTORY_ERROR:
      return { ...state, errorMessage: action.payload.error };
    default:
      return state;
  }
}

export default historyReducer;