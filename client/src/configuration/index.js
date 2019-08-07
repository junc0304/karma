
export const NODE_ENV = process.env.NODE_ENV || 'dev'
export const SERVER_HOST =  process.env.SERVER_HOST || 'http://localhost:'; 
export const SERVER_PORT = process.env.SERVER_PORT || '4000'
export const SERVER_URL = process.env.SERVER_HOST && process.env.SERVER_PORT  ? '' : SERVER_HOST + SERVER_PORT;

export const BOARD_TYPE = {
    MEETING: 'MEETING',
    EVENT: 'EVENT',
    NOTICE: 'NOTICE',
    RANDOM: 'RANDOM'
}

export const BOARD_TYPE_URL = {
    MEETING: '/boards/meeting',
    EVENT: '/boards/event',
    NOTICE: '/boards/notice',
    QUESTION: '/boards/random'
}