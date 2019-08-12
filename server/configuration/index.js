module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'dev',

  SERVER_PORT: process.env.SERVER_PORT || 4000,
  DATABASE_URL: process.env.MONGO_URL || 'mongodb://localhost/karmaDB',

  JWT_SECRET: process.env.JWT_SECRET || 'testJWT',
  JWT_EXPIRY: process.env.JWT_EXPIRY || 60 * 60 * 3,
  TOKEN_ISSUER: process.env.TOKEN_ISSUER || 'JCJC',

  COOKIE_TOKEN: process.env.COOKIE_TOKEN || 'cookie_token',
  COOKIE_MAX_AGE: process.env.COOKIE_MAX_AGE || 1000 * 60 * 60,
  BOARD_TYPE: ['NOTICE', 'MEETING', 'EVENT', 'DISCUSSION'],
  PAGE_TYPE: ['HOME', 'SUMMARY', 'HISTORY', 'MEMBERSHIP'],
  USER_ROLES: {
    OWNER: 'OWNER',
    ADMIN: 'ADMIN',
    USER: 'USER',
  },

  COMMENT_STATUS: ['ACTIVE', 'INACTIVE', 'HIDDEN'],

  ADMIN_ROLES: ['OWNER', 'ADMIN'],

  ACCOUNT_TYPE: ['local', 'google', 'facebook']

}
