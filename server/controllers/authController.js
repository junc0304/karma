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

  signup(signupItem) {
    var result, newUser;
    try {
      if (this.userDataHandler.getUserByEmail(signupItem.email)) {
        throw new Error('the email already exists');
      }
      newUser = this.userDataHandler.createUser(signupItem);
      result = signToken(newUser);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  signin(user) {
    var result;
    try {
      result = signToken(user);
    } catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  signout() {
    
  }
}

module.exports = AuthController;