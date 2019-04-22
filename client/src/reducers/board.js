import {BOARD_GET_EVENT, BOARD_GET_NOTICE, BOARD_GET_MEETING, BOARD_GET_RANDOM} from '../actions/types';

const DEFAULT_STATE = {
    type: '',
    data: '',
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type) {
        case BOARD_GET_EVENT:
            return {...state, type: 'Event' , data: action.payload.data}
        case BOARD_GET_NOTICE:
            return {...state, type: 'Notice' , data: action.payload.data}
        case BOARD_GET_MEETING:
            return {...state, type: 'Meeting', data: action.payload}
        case BOARD_GET_RANDOM:
            return {...state, type: 'Random' , data: action.payload.data}
        default:
            return state
    }
}