module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'dev',

    SERVER_PORT : 4000,
    DATABASE_URL :  'mongodb://localhost/karmaDB',

    JWT_SECRET: process.env.JWT_SECRET || 'testJWT',
    JWT_EXPIRY: process.env.JWT_EXPIRY || 1,
    TOKEN_ISSUER:'JCJC',

    COOKIE_TOKEN: 'karma-cookie',
    BOARD_TYPE: ['NOTICE', 'MEETING', 'EVENT', 'DISCUSSION'],
    PAGE_TYPE: ['HOME', 'SUMMARY', 'HISTORY', 'MEMBERSHIP'],
    USER_ROLES: {
      OWNER:'owner',
      ADMIN:'admin',
      USER: 'user',
    },
    COMMENT_STATUS: ['ACTIVE', 'INACTIVE', 'HIDDEN'],

    ADMIN_ROLES: ['owner', 'admin'],

    ACCOUNT_TYPE: ['local', 'google', 'facebook']
   
}
