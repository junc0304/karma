import axios from 'axios';
import {
  //auth
  AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_SIGN_UP_ERROR, AUTH_SIGN_IN_ERROR, AUTH_SIGN_RESET,
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
  GET_USER, UPDATE_USER, USER_ERROR, RESET_USER

} from './types';
import { PAGE_TYPE, BOARD_TYPE } from '../config';

//auth
export const signUp = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post('http://localhost:4000/auth/signup', data);
      dispatch({
        type: AUTH_SIGN_UP,
        payload: res.data
      });
    } catch (err) {
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
      let res = await axios.post('http://localhost:4000/auth/signin', data);
      dispatch({
        type: AUTH_SIGN_IN,
        payload: res.data
      });
    }
    catch (err) {
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
      await axios.post('http://localhost:4000/auth/signout');
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
      type: AUTH_SIGN_RESET
    })
  }
}

export const getUser = (data) => {
  return async dispatch => {
    try {
      console.log("getUser", data)
      let res = await axios.post('http://localhost:4000/user/get', data);
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    }
    catch (err) {
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
      let res = await axios.post('http://localhost:4000/user/update', data);
      dispatch({
        type: UPDATE_USER,
        payload: res.data
      })
    }
    catch (err) {
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
      const res = await axios.post(`http://localhost:4000/post/`, { type });
      dispatch({
        type: getPostType(type),
        payload: res.data
      });
    } catch (err) {
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
      const res = await axios.post(`http://localhost:4000/post/recent`, { days });
      await dispatch({
        type: GET_HEADER_DATA,
        payload: res.data
      });
    } catch (err) {
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
      const res = await axios.post(`http://localhost:4000/post/`, { type, pageSize, lastItemDate });
      dispatch({
        type: getPostType(type),
        payload: res.data
      });
    } catch (err) {
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
      await axios.post(`http://localhost:4000/post/create`, data);
      dispatch({
        type: CREATE_POST,
      });
    } catch (err) {
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
      await axios.post(`http://localhost:4000/post/update`, data);
      dispatch({
        type: UPDATE_POST,
      });
    } catch (err) {
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
      await axios.post(`http://localhost:4000/post/delete`, data);
      dispatch({
        type: DELETE_POST,
      });
    } catch (err) {
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
      dispatch({
        type: POST_ERROR,
        payload: err.message
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
      dispatch({
        type: POST_ERROR,
        payload: err.message
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
      dispatch({
        type: POST_ERROR,
        payload: err.message
      });
    }
  }
}

//member
export const getMembers = () => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/user/`);
      dispatch({
        type: GET_MEMBER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEMBER_ERROR,
        payload: err.user
      });
    }
  }
}

export const updateMembers = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/user/update`, data);
      dispatch({
        type: UPDATE_MEMBER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEMBER_ERROR,
        payload: err.message
      });
    }
  }
}

export const deleteMembers = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/user/delete`, data);
      dispatch({
        type: MEMBER_DELETE,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: MEMBER_ERROR,
        payload: err.message
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
      let res = await axios.post(`http://localhost:4000/page/get`, { type });
      dispatch({
        type: getPageType(type),
        payload: res.data
      });
    }
    catch (err) {
      dispatch({
        type: PAGE_ERROR,
        payload: err.message
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
      dispatch({
        type: PAGE_ERROR,
        payload: err.message
      });
    }
  };
}

export const createPage = (data) => {
  return async dispatch => {
    try {
      await axios.post(`http://localhost:4000/page/create`, data);
      dispatch({
        type: CREATE_PAGE
      });
    }
    catch (err) {
      dispatch({
        type: PAGE_ERROR,
        payload: err.message
      });
    }
  };
}

export const updatePage = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/page/update`, data);
      dispatch({
        type: UPDATE_PAGE,
        payload: res.page
      });
    }
    catch (err) {
      dispatch({
        type: PAGE_ERROR,
        payload: err.message
      });
    }
  };

}

export const deletePage = (type) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/page/delete`);
      dispatch({
        type: DELETE_PAGE,
        payload: res.page
      });
    }
    catch (err) {
      dispatch({
        type: PAGE_ERROR,
        payload: err.message
      });
    }
  };
}

//comments
export const getComments = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/comment/`, data);
      dispatch({
        type: GET_COMMENT,
        payload: res.data
      });
    }
    catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.message
      });
    }
  };
}

export const createComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/comment/create`, data);
      dispatch({
        type: CREATE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.message
      });
    }
  };
}

export const updateComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/comment/update`, data);
      dispatch({
        type: UPDATE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.message
      });
    }
  };
}

export const deleteComment = (data) => {
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/comment/delete`, data);
      dispatch({
        type: DELETE_COMMENT,
        payload: res.comment
      });
    }
    catch (err) {
      dispatch({
        type: COMMENT_ERROR,
        payload: err.message
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
      dispatch({
        type: COMMENT_ERROR,
        payload: err.message
      });
    }
  };
}


export const getHistory = () => {
  return async dispatch => {
    try {
      console.log("get history")
      let res = await axios.get(`http://localhost:4000/history/all`);
      console.log(res)
      dispatch({
        type: GET_HISTORY,
        payload: res.data
      });
    } catch (err) {
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
      await axios.post(`http://localhost:4000/history/create`, data);
      dispatch({
        type: CREATE_HISTORY,
      });
    } catch (err) {
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
      console.log("update history: ", data)
      await axios.post(`http://localhost:4000/history/update`, data);
      dispatch({
        type: UPDATE_HISTORY,
      });
    } catch (err) {
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
      await axios.post(`http://localhost:4000/history/delete`, data);
      dispatch({
        type: DELETE_HISTORY,
      });
    } catch (err) {
      dispatch({
        type: HISTORY_ERROR,
        payload: err
      });
    }
  }
}