module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    PORT : process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 4000,
    HOST : process.env.OPENSHIFT_NODEJS_IP || process.env.HOST || '127.0.0.1',

    DATABASE_URL : 
    process.env.OPENSHIFT_MONGODB_DB_URL +
    process.env.OPENSHIFT_APP_NAME || process.env.MONGO_URI || '127.0.0.1:27017/karma',

    JWT_SECRET: process.env.JWT_SECRET || 'testJWT',
    JWT_EXPIRY: process.env.JWT_EXPIRY || 1,

    BOARD_TYPE: ['notice', 'meeting', 'event', 'question'],
    USER_ROLES: {
        ALL: ['owner','admin','user'],
        ADMIN: ['owner', 'admin'],
        USER: ['user'],   
    },
    ACCOUNT_TYPE: ['local', 'google', 'facebook'],
    
   
}
