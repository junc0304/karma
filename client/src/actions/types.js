//auth
export const AUTH_SIGN_UP = 'AUTH_SIGN_UP';
export const AUTH_SIGN_IN = 'AUTH_SIGN_IN';
export const AUTH_SIGN_OUT = 'AUTH_SIGN_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_SIGN_UP_ERROR = 'AUTH_SIGN_UP_ERROR';
export const AUTH_SIGN_IN_ERROR = 'AUTH_SIGN_IN_ERROR';
export const AUTH_SIGN_RESET = 'AUTH_SIGN_RESET';
export const AUTH_REFRESH = 'AUTH_REFRESH';
//get board
/* export const BOARD_GET_MEETING    = 'BOARD_GET_MEETING';
export const BOARD_GET_EVENT      = 'BOARD_GET_EVENT';
export const BOARD_GET_NOTICE     = 'BOARD_GET_NOTICE';
export const BOARD_GET_DISCUSSION = 'BOARD_GET_DISCUSSION'; */
//board 
export const GET_POST = {
  MEETING: 'GET_MEETING',
  EVENT: 'GET_EVENT',
  NOTICE: 'GET_NOTICE',
  DISCUSSION: 'GET_DISCUSSION',
};

export const GET_RECENT = 'GET_RECENT';
export const RESET_RECENT = 'RESET_RECENT';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const RESET_POST = 'RESET_POST';
export const POST_ERROR = 'POST_ERROR';
export const SET_CURRENT_POST = 'SET_CURRENT_POST';
export const RESET_CURRENT_POST = 'RESET_CURRENT_POST';
export const SET_NEW_POST = 'SET_NEW_POST';
//member
export const GET_MEMBER = 'GET_MEMBER';
export const UPDATE_MEMBER = 'UPDATE_MEMBER';
export const MEMBER_ERROR = 'MEMBER_ERROR';
export const MEMBER_DELETE = 'MEMBER_DELETE';
export const RESET_MEMBER = 'RESET_MEMBER';
//page
export const GET_PAGE = {
  HOME: 'GET_HOME',
  SUMMARY: 'GET_SUMMARY',
  MEMBERSHIP: 'GET_MEMBERSHIP'
}
export const CREATE_PAGE = 'CREATE_PAGE';
export const UPDATE_PAGE = 'UPDATE_PAGE';
export const DELETE_PAGE = 'DELETE_PAGE';
export const RESET_PAGE = 'RESET_PAGE';
export const PAGE_ERROR = 'PAGE_ERROR';

export const GET_COMMENT = 'GET_COMMENT';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RESET_COMMENT = 'RESET_COMMENT';
export const COMMENT_ERROR = 'COMMENT_ERROR';

export const GET_HEADER_DATA = 'GET_HEADER_DATA';
export const HEADER_ERROR = 'HEADER_ERROR';

//history
export const GET_HISTORY = 'GET_HISTORY';
export const CREATE_HISTORY = 'CREATE_HISTORY';
export const UPDATE_HISTORY = 'UPDATE_HISTORY';
export const DELETE_HISTORY = 'DELETE_HISTORY';
export const RESET_HISTORY = 'RESET_HISTORY';
export const HISTORY_ERROR = 'HISTORY_ERROR';

//user
export const USER_ERROR = 'USER_ERROR';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const RESET_USER = 'RESET_USER';


//ERRORS
export const AUTH_EXPIRE = "AUTH_EXPIRE";
export const NO_ERROR = "NO_ERROR"