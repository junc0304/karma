import { HEADER_ERROR, GET_HEADER_DATA } from '../actions/types';
import {BOARD_TYPE} from '../config'
import { isEmpty } from '../helpers';
import Notice from '../components/Notice';
const { EVENT, NOTICE, MEETING, DISCUSSION } = BOARD_TYPE;

const initialState = {
  newEvent: false,
  newNotice: false,
  newMeeting: false,
  newDiscussion: false,
  errorMessage: ''
}

const authReducer = (state = initialState, action) =>{
  switch (action.type) {
    case GET_HEADER_DATA:
      console.log(action.payload, )
      return { 
        newEvent: action.payload.type.includes(EVENT), 
        newNotice: action.payload.type.includes(NOTICE), 
        newMeeting: action.payload.type.includes(MEETING), 
        newDiscussion: action.payload.type.includes(DISCUSSION), 
        errorMessage:''
      }
    case HEADER_ERROR:
      return {
        ...initialState,
        errorMessage: action.payload
       };
    default:
      return state;
  }
}

export default authReducer;