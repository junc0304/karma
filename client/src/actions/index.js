import axios from 'axios';
import {
  //auth
  AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR,
  //board
  GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, RESET_POST, POST_ERROR,
  //member
  MEMBER_ERROR, GET_MEMBER, UPDATE_MEMBER, MEMBER_DELETE, RESET_MEMBER,
  //page
  GET_PAGE, CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE, RESET_PAGE, PAGE_ERROR,
  //comment
  GET_COMMENT, CREATE_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, RESET_COMMENT, COMMENT_ERROR, SET_CURRENT_POST, RESET_CURRENT_POST, SET_NEW_POST,
  //header
  GET_HEADER_DATA, HEADER_ERROR,
  //history
  GET_HISTORY, CREATE_HISTORY, UPDATE_HISTORY, DELETE_HISTORY, HISTORY_ERROR,
  //user
  GET_USER, UPDATE_USER, USER_ERROR, RESET_USER,
} from './types';
import { PAGE_TYPE, BOARD_TYPE, API } from '../config';

const check401 = (err, dispatch) => {
  if (err.response.status === 401) {
    dispatch({
      type: AUTH_SIGN_OUT
    });
    sessionStorage.clear();
  }
}

//auth
export const signUp = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.SIGN_UP, data);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });
      sessionStorage.setItem("isAuth", true);
    } catch (err) {
      check401(err, dispatch);

      dispatch({
        type: AUTH_SIGN_UP_ERROR,
        payload: 'Required information is missing or incomplete. Please correct your entries and try again.'
      })
    }
  };
}

export const signIn = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.SIGN_IN, data);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data
      });
      sessionStorage.setItem("isAuth", true);
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: AUTH_SIGN_IN_ERROR,
        payload: 'Incorrect User ID and/or password.'
      });
    }
  };
}

export const signOut = () => {
  return async dispatch => {
    try {
      await axios.post(API.SIGN_OUT);
      dispatch({
        type: AUTH_SIGN_OUT
      });
      dispatch({
        type: RESET_POST
      });
      dispatch({
        type: RESET_PAGE
      });
      dispatch({
        type: RESET_MEMBER
      })
      sessionStorage.clear();
    }
    catch (err) {
      dispatch({
        type: AUTH_SIGN_IN_ERROR,
        payload: 'Failed to Sign Out'
      });
    }
  }
}

export const signReset = () => {
  return async dispatch => {
    dispatch({
      type: AUTH_SIGN_OUT
    })
  }
}

export const getUser = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.GET_USER, data);
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: USER_ERROR,
        payload: 'Failed to get User Profile'
      })
    }
  }
}

export const updateUser = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.UPDATE_USER, data);
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: USER_ERROR,
        payload: 'Failed to update User Profile'
      })
    }
  }
}

export const resetUser = () => {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_USER,
      })
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: USER_ERROR,
        payload: 'Failed to reset User info'
      })
    }
  }
}

const getPostType = (type) => {
  switch (type) {
    case BOARD_TYPE.MEETING:
      return GET_POST.MEETING;
    case BOARD_TYPE.NOTICE:
      return GET_POST.NOTICE;
    case BOARD_TYPE.EVENT:
      return GET_POST.EVENT;
    case BOARD_TYPE.DISCUSSION:
      return GET_POST.DISCUSSION;
    default:
      return POST_ERROR;
  }
}

//board
export const getPosts = (type) => {
  return async dispatch => {
    try {
      await dispatch({
        type: RESET_POST,
      });
      const res = await axios.post(API.GET_POST, { type });
      dispatch({
        type: getPostType(type),
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const getHeaderData = (days) => {
  return async dispatch => {
    try {
      const res = await axios.post(API.GET_HEADER, { days });
      await dispatch({
        type: GET_HEADER_DATA,
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: HEADER_ERROR,
        payload: err
      });
    }
  }
}


export const getPagePosts = (type, pageSize, lastItemDate) => {
  return async dispatch => {
    try {
      await dispatch({
        type: RESET_POST,
      });
      const res = await axios.post(API.GET_POST2, { type, pageSize, lastItemDate });
      dispatch({
        type: getPostType(type),
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const createPost = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.CREATE_POST, data);
      dispatch({
        type: CREATE_POST,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const updatePost = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.UPDATE_POST, data);
      dispatch({
        type: UPDATE_POST,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const deletePost = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.DELETE_POST, data);
      dispatch({
        type: DELETE_POST,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const openRow = (post) => {
  return dispatch => {
    try {
      dispatch({
        type: SET_CURRENT_POST,
        payload: post
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const closeRow = () => {
  return dispatch => {
    try {
      dispatch({
        type: RESET_CURRENT_POST
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

export const openNewRow = () => {
  return dispatch => {
    try {
      dispatch({
        type: SET_NEW_POST
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: POST_ERROR,
        payload: err
      });
    }
  }
}

//member
export const getMembers = () => {
  return async dispatch => {
    try {
      let res = await axios.post(API.GET_USERS);
      dispatch({
        type: GET_MEMBER,
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: MEMBER_ERROR,
        payload: err
      });
    }
  }
}

export const updateMembers = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.UPDATE_USER, data);
      dispatch({
        type: UPDATE_MEMBER,
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: MEMBER_ERROR,
        payload: err
      });
    }
  }
}

export const deleteMembers = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.DELETE_USER, data);
      dispatch({
        type: MEMBER_DELETE,
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: MEMBER_ERROR,
        payload: err
      });
    }
  }
}

const getPageType = (type) => {
  switch (type) {
    case PAGE_TYPE.HOME:
      return GET_PAGE.HOME;
    case PAGE_TYPE.SUMMARY:
      return GET_PAGE.SUMMARY;
    case PAGE_TYPE.MEMBERSHIP:
      return GET_PAGE.MEMBERSHIP;
    default:
      return POST_ERROR;
  }
}
//page
export const getPage = (type) => {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_PAGE,
      });
      let res = await axios.post(API.GET_PAGE, { type });
      dispatch({
        type: getPageType(type),
        payload: res.data
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: PAGE_ERROR,
        payload: err
      });
    }
  };
}

export const resetPage = () => {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_PAGE,
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: PAGE_ERROR,
        payload: err
      });
    }
  };
}

export const createPage = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.CREATE_PAGE, data);
      dispatch({
        type: CREATE_PAGE
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: PAGE_ERROR,
        payload: err
      });
    }
  };
}

export const updatePage = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.UPDATE_PAGE, data);
      dispatch({
        type: UPDATE_PAGE,
        payload: res.page
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: PAGE_ERROR,
        payload: err
      });
    }
  };

}

export const deletePage = (type) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.DELETE_PAGE);
      dispatch({
        type: DELETE_PAGE,
        payload: res.page
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: PAGE_ERROR,
        payload: err
      });
    }
  };
}

//comments
export const getComments = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.GET_COMMENT, data);
      dispatch({
        type: GET_COMMENT,
        payload: res.data
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}

export const createComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.CREATE_COMMENT, data);
      dispatch({
        type: CREATE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}

export const updateComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.UPDATE_COMMENT, data);
      dispatch({
        type: UPDATE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}

export const deleteComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(API.DELETE_COMMENT, data);
      dispatch({
        type: DELETE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}

export const resetComments = () => {
  return async dispatch => {
    try {
      dispatch({
        type: RESET_COMMENT
      });
    }
    catch (err) {
      check401(err, dispatch);
      dispatch({
        type: COMMENT_ERROR,
        payload: err
      });
    }
  };
}


export const getHistory = () => {
  return async dispatch => {
    try {
      let res = await axios.get(API.GET_HISTORY);
      dispatch({
        type: GET_HISTORY,
        payload: res.data
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: HISTORY_ERROR,
        payload: err
      });
    }
  }
}


export const createHistory = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.CREATE_HISTORY, data);
      dispatch({
        type: CREATE_HISTORY,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: HISTORY_ERROR,
        payload: err
      });
    }
  }
}

export const updateHistory = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.UPDATE_HISTORY, data);
      dispatch({
        type: UPDATE_HISTORY,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: HISTORY_ERROR,
        payload: err
      });
    }
  }
}

export const deleteHistory = (data) => {
  return async dispatch => {
    try {
      await axios.post(API.DELETE_HISTORY, data);
      dispatch({
        type: DELETE_HISTORY,
      });
    } catch (err) {
      check401(err, dispatch);
      dispatch({
        type: HISTORY_ERROR,
        payload: err
      });
    }
  }
}