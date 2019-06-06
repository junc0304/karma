const JWT = require('jsonwebtoken');
const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');
const { JWT_SECRET, JWT_EXPIRY, TOKEN_ISSUER } = require('../config');

const signToken = ({ user }) => {
  return JWT.sign({
    iss: TOKEN_ISSUER,
    sub: user.id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + JWT_EXPIRY)
  }, JWT_SECRET);
};

class AuthController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  signUp(signUpItem) {
    var result;
    try {
      if (this.userDataHandler.getUser(signupItem.email)) {
        throw new Error();
      }
      result = this.userDataHandler.createUser(signUpItem);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  signIn(authItem) {
    var result;
    try {
      result = signToken(authItem);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }
}

module.exports = AuthController;