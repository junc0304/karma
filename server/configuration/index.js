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

export const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3000;
export const host = process.env.OPENSHIFT_NODEJS_IP || 'localhost';
export const databaseUrl = process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/karma';
