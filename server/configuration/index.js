module.exports = {
    JWT_SECRET: 'KARMA_SECRET',
    BOARD_TYPE: ['notice', 'meeting', 'event', 'question'],
    USER_ROLES: {
        ALL: ['owner','admin','user'],
        ADMIN: ['owner', 'admin'],
        USER: ['user'],   
    },
    ACCOUNT_TYPE: ['local', 'google', 'facebook'],
    PORT : process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000,
    HOST : process.env.OPENSHIFT_NODEJS_IP || 'localhost',
    DATABASE_URL : process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/karma'
}
