import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_SIGN_IN , AUTH_ERROR, AUTH_SIGN_OUT,  BOARD_GET_EVENT, BOARD_GET_MEETING} from './types'

export const signUp = (data) => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/users/signup', data)
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
            const res = await axios.post('http://localhost:5000/users/signin', data)
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

export const getEvent = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:5000/event');
            dispatch({
                type: BOARD_GET_EVENT,
                paload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    };
}

export const getNotice = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:5000/notice');
            dispatch({
                type: BOARD_GET_EVENT,
                paload: [res.data]
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

export const getMeeting = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:5000/boards/meeting');
            console.log('data',res.data);
            dispatch({
                type: BOARD_GET_MEETING,
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

export const postNewItem = () => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:5000/boards/meeting');
            dispatch({
                type: BOARD_GET_MEETING,
                payload: res.data
            });
        }
        catch (error) {
            console.error('err', error);
        }
    }
}

