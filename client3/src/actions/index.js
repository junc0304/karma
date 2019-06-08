import axios from 'axios';
import {
  AUTH_SIGN_UP,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  AUTH_ERROR,

  BOARD_GET_MEETING, 
  BOARD_GET_EVENT, 
  BOARD_GET_NOTICE, 
  BOARD_GET_FREECHAT,
  BOARD_POST_DATA, 
  BOARD_UPDATE_DATA, 
  BOARD_DELETE_DATA,
  BOARD_ERROR,

} from './types';

import { BOARD_TYPE } from '../config';
const { MEETING, NOTICE, EVENT, FREECHAT } = BOARD_TYPE;

const BOARD_GET_TYPE = (type) => {
  switch(type) {
    case MEETING :
      return BOARD_GET_MEETING;
    case EVENT:
      return BOARD_GET_EVENT;
    case NOTICE:
      return BOARD_GET_NOTICE;
    case FREECHAT:
      return BOARD_GET_FREECHAT;
  }
};

export const signUp = (data) => {
  return async dispatch => {
    try {
      await axios.post('http://localhost:4000/auth/signup', data);
      dispatch({
        type: AUTH_SIGN_UP
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
      await axios.post('http://localhost:4000/auth/signin', data);
      dispatch({
        type: AUTH_SIGN_IN
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
    await axios.get('http://localhost:5000/users/signout');
    dispatch({
      type: AUTH_SIGN_OUT
    })
  };
}

export const getPosts = (type) => {
  return async dispatch => {
    try {
      const res = await axios.get(`http://localhost:4000/board/${type}`);
      dispatch({
        type: BOARD_GET_TYPE(type),
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err
      });
    }
  }
}

export const createPost = (data) => {
  return async dispatch => {
    try {
      await axios.post(`http://localhost:4000/board/create`, data);
      dispatch({
        type: BOARD_POST_DATA
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err
      });
    }
  }
}

export const updatePost = (data) => {
  return async dispatch => {
    try {
      await axios.post(`http://localhost:4000/board/update`, data);
      dispatch({
        type: BOARD_UPDATE_DATA
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err
      });
    }
  }
}

export const deletePost = (data) => {
  return async dispatch => {
    try {
      await axios.post(`http://localhost:4000/board/delete`, data);
      dispatch({
        type: BOARD_DELETE_DATA
      });
    } catch (err) {
      dispatch({
        type: BOARD_ERROR,
        payload: err
      });
    }
  }
}