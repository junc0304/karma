import { GET_PAGE, CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE, PAGE_ERROR, RESET_PAGE } from '../actions/types';

const initialState = {
  type: '',         //page type
  data: {},         //page data
  errorMessage: ''  //error message
}

const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    //board get actions
    case GET_PAGE.HOME:
      return { ...state, type: action.payload.page.type, data: action.payload.page, errorMessage: '' };
    case GET_PAGE.SUMMARY:
      return { ...state, type: action.payload.page.type, data: action.payload.page, errorMessage: '' };
    case GET_PAGE.MEMBERSHIP:
      return { ...state, type: action.payload.page.type, data: action.payload.page, errorMessage: '' };
    case CREATE_PAGE:
      return { ...state, errorMessage: '' };
    case UPDATE_PAGE:
      return { ...state, errorMessage: '' };
    case DELETE_PAGE:
      return { ...state, errorMessage: '' };
    case RESET_PAGE:
      return { ...state, type: '', data: {}};
    case PAGE_ERROR:
      return { ...state, errorMessage: '' }
    default:
      return state;
  }
}

export default pageReducer;