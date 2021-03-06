const JWT = require('jsonwebtoken');
const HttpExceptionHandler = require('../classes/HttpResponseException/httpResponseException');
const { JWT_SECRET, JWT_EXPIRY, TOKEN_ISSUER } = require('../configuration');

const signToken = (user) => {
  return JWT.sign({
    iss: TOKEN_ISSUER,
    sub: user._id,
    iat: Math.floor(Date.now() / 1000), 
    exp: Math.floor(Date.now() / 1000) + JWT_EXPIRY
  }, JWT_SECRET);
};

class AuthController {
  constructor(userDataHandler) {
    this.userDataHandler = userDataHandler;
  }

  async signUp(body) {
    let result, user;
    try {
      if (await this.userDataHandler.foundEmail(body.email)) {
        return { error: "email already exists" }
      }
      await this.userDataHandler.createUser(body);
      user = await this.userDataHandler.getUserByEmail(body.email);
      result = { 
        token: signToken(user) 
      };
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async signIn(body, user) {
    let result;
    try {
      let { userId, name, email, role } = await this.userDataHandler.getUserByEmail(body.email);
      result = { 
        user: { userId, name, email, role }, 
        token: signToken(user) 
      }
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