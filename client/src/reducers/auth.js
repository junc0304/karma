import { AUTH_SIGN_UP,AUTH_SIGN_IN, AUTH_ERROR, AUTH_SIGN_OUT } from '../actions/types';

const DEFAULT_STATE = {
    isAuthenticated: false,
    token: '',
    role: 'guest',
    errorMessage: ''
}

export default (state = DEFAULT_STATE, action) => {
    console.log('payload', action.payload);
    switch (action.type) {
        case AUTH_SIGN_UP:
            return { ...state, token: action.payload.token, role: 'guest', isAuthenticated: true, errorMessage: '' }
        case AUTH_SIGN_IN:
            return { ...state, token: action.payload.token, role:action.payload.role, isAuthenticated: true, errorMessage: '' }
        case AUTH_ERROR:
            return { ...state, errorMessage: action.payload }
        case AUTH_SIGN_OUT:
            return { ...state, token: action.payload, role: 'guest', isAuthenticated: false, errorMessage: '' }
        default:
            return state;
    }
}