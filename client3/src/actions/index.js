import axios from 'axios';
import {
  //auth
  AUTH_SIGN_UP, AUTH_SIGN_OUT, AUTH_SIGN_IN, AUTH_ERROR,
  //board
  GET_POST, CREATE_POST, UPDATE_POST, DELETE_POST, POST_ERROR,
  //member
  MEMBER_ERROR, GET_MEMBER, UPDATE_MEMBER, MEMBER_DELETE,
  //page
  GET_PAGE, CREATE_PAGE, UPDATE_PAGE, DELETE_PAGE, RESET_PAGE, PAGE_ERROR, RESET_POST
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
        type: AUTH_ERROR,
        payload: err
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
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err
      })
    }
  };
}

export const signOut = () => {
  return async dispatch => {
    await axios.post('http://localhost:5000/auth/signout');
    dispatch({
      type: AUTH_SIGN_OUT
    })
  };
}

const getPostType = (type) => {
  switch(type) {
    case BOARD_TYPE.MEETING :
      return GET_POST.MEETING;
    case BOARD_TYPE.NOTICE:
      return GET_POST.NOTICE;
    case BOARD_TYPE.EVENT:
      return GET_POST.EVENT;
    case BOARD_TYPE.DISCUSSION:
      return GET_POST.DISCUSSION;
    default: 
      throw "action not found";
  }
}

//board
export const getPosts = (type) => {
  console.log("board GET:", type);
  return async dispatch => {
    try {
      dispatch({
        type: RESET_POST,
      });
      const res = await axios.post(`http://localhost:4000/post/`, {type});
      console.log(res.data)
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
  console.log("board POST:", data);
  return async dispatch => {
    try {
      await dispatch({
        type: RESET_POST,
      });
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
  console.log("board PUT:", data);
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
  console.log("board DELETE:", data);
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

//member
export const getMembers = () => {
  console.log("member GET");
  return async dispatch => {
    try {
      let res = await axios.post(`http://localhost:4000/user/`);
      console.log(res)
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
  console.log("member UPDATE:", data);
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
  console.log("member DELETE:", data);
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

const getPageType= (type)=> {
  switch(type) {
    case PAGE_TYPE.HOME :
      return GET_PAGE.HOME;
    case PAGE_TYPE.SUMMARY:
      return GET_PAGE.SUMMARY;
    case PAGE_TYPE.MEMBERSHIP:
      return GET_PAGE.MEMBERSHIP;
    default: 
      throw "action not found";
  }
}
//page
export const getPage = (type) => {
  console.log("page GET:", type);
  return async dispatch => {
    try {
      dispatch({
        type: RESET_PAGE,
      });
      let res = await axios.post(`http://localhost:4000/page/get`, {type});
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
  console.log("page CREATE:", data);
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
      console.log(data);
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
  console.log("page DELETE:", type);
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
