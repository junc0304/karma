const JWT = require('jsonwebtoken');
const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');
const { JWT_SECRET, JWT_EXPIRY, TOKEN_ISSUER } = require('../configuration');

const signToken = (user) => {
  return JWT.sign({
    iss: TOKEN_ISSUER,
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + JWT_EXPIRY)
  }, JWT_SECRET);
};

class AuthController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  async signUp(body) {
    let result, user;
    try {
      await this.userDataHandler.createUser(body);
      user = await this.userDataHandler.getUserByEmail(body.email);
      result = {
        user,
        token: signToken(user)
      };
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async signIn(user) {
    let result;
    try {
      result = { 
        user: await this.userDataHandler.getUserByEmail(body.email),
        token: signToken(user)};
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async signout() {

  }
}

module.exports = AuthController;