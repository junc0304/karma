module.exports = {

    JWT_SECRET: 'KARMA_SECRET',
    BOARD_TYPE: ['notice', 'meeting', 'event', 'question'],
    USER_ROLES: {
        ALL: ['owner','admin','user'],
        ADMIN: ['owner', 'admin'],
        USER: ['user'],   
    },
    ACCOUNT_TYPE: ['local', 'google', 'facebook']

}