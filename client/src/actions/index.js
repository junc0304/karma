import axios from 'axios';
import { 
    AUTH_SIGN_UP, AUTH_SIGN_IN , AUTH_ERROR, AUTH_SIGN_OUT,  
    BOARD_GET_EVENT, BOARD_GET_MEETING, BOARD_GET_RANDOM, BOARD_GET_NOTICE,
    BOARD_PUT_EVENT, BOARD_PUT_MEETING, BOARD_PUT_RANDOM, BOARD_PUT_NOTICE,
    BOARD_DEL_EVENT, BOARD_DEL_MEETING, BOARD_DEL_RANDOM, BOARD_DEL_NOTICE,
    BOARD_POST_EVENT, BOARD_POST_MEETING, BOARD_POST_RANDOM, BOARD_POST_NOTICE } from './types';

import { SERVER_URL, BOARD_TYPE_URL, BOARD_TYPE } from '../configuration';


export const signUp = (data) => {
    return async dispatch => {
        try {
            const res = await axios.post(SERVER_URL+ '/users/signup', data)
            console.log('res', res);

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] =  res.data.token;
        }
        catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error
            })
            console.log('error',error);
        }
    }
}

export const signIn = (data) => {
    return async dispatch => {
        try {
            const res = await axios.post(SERVER_URL+ '/users/signin', data)
            console.log('res', res);

            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data
            });
            localStorage.setItem('JWT_TOKEN', res.data.token);
            axios.defaults.headers.common['Authorization'] =  res.data.token;
        }
        catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error
            })
            console.log('error',error);
        }
    }
}

export const signOut = () => {
    return dispatch => {
        try {
            localStorage.removeItem('JWT_TOKEN');
            axios.defaults.headers.common['Authorization'] = '';
            dispatch({
                type:AUTH_SIGN_OUT,
                payload: ''
            });
        }
        catch (error) {
            console.error('error', error);
        }
    };
}

//boardHandlers
const urlType = (type) => {
    switch(type) {
        case BOARD_TYPE.MEETING :
            return BOARD_TYPE_URL.MEETING;
        case BOARD_TYPE.EVENT :
            return BOARD_TYPE_URL.EVENT;
        case BOARD_TYPE.NOTICE :
            return BOARD_TYPE_URL.NOTICE;
        case BOARD_TYPE.QUESTION :
            return BOARD_TYPE_URL.QUESTION;
        default:
    }
}

const postType = (type) => {
    switch(type) {
        case BOARD_TYPE.MEETING :
            return BOARD_POST_MEETING;
        case BOARD_TYPE.EVENT :
            return BOARD_POST_EVENT;
        case BOARD_TYPE.NOTICE :
            return BOARD_POST_NOTICE;
        case BOARD_TYPE.QUESTION:
            return BOARD_POST_RANDOM;
        default:
    }
}

const getType = (type) => {
    switch(type) {
        case BOARD_TYPE.MEETING :
            return BOARD_GET_MEETING;
        case BOARD_TYPE.EVENT :
            return BOARD_GET_EVENT;
        case BOARD_TYPE.NOTICE :
            return BOARD_GET_NOTICE;
        case BOARD_TYPE.QUESTION:
            return BOARD_GET_RANDOM;
        default:
    }
}

const putType = (type) => {
    switch(type) {
        case BOARD_TYPE.MEETING :
            return BOARD_PUT_MEETING;
        case BOARD_TYPE.EVENT :
            return BOARD_PUT_EVENT;
        case BOARD_TYPE.NOTICE :
            return BOARD_PUT_NOTICE;
        case BOARD_TYPE.QUESTION:
            return BOARD_PUT_RANDOM;
        default:
    }
}


const deleteType = (type) => {
    switch(type) {
        case BOARD_TYPE.MEETING :
            return BOARD_DEL_MEETING;
        case BOARD_TYPE.EVENT :
            return BOARD_DEL_EVENT;
        case BOARD_TYPE.NOTICE :
            return BOARD_DEL_NOTICE;
        case BOARD_TYPE.QUESTION:
            return BOARD_DEL_RANDOM;
        default:
    }
}

export const postItem = (type, data) => {
    return async dispatch => {
        try {
            const res = await axios.post(SERVER_URL + urlType(type));
            dispatch({
                type: postType(type),
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}


export const getItem = (type) => {
    return async dispatch => {
        try {
            const res = await axios.get(SERVER_URL + urlType(type));
            dispatch({
                type: getType(type),
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

export const putItem = (type) => {
    return async dispatch => {
        try {
            const res = await axios.put(SERVER_URL + urlType(type));
            dispatch({
                type: putType(type),
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

export const deleteItem = (type) => {
    return async dispatch => {
        try {
            const res = await axios.delete(SERVER_URL + urlType(type));
            dispatch({
                type: deleteType(type),
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

