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

  async signup(formItem) {
    let result, emailExists;
    try {
      //verify email
      let { email } = formItem;
      emailExists = await this.userDataHandler.foundEmail(email);
      if (emailExists) {
        throw 'Email already exists';
      }
      //create, retrieve, assign user / token 
      await this.userDataHandler.createUser(formItem)
      let user = await this.userDataHandler.getUserFromEmail(email);
      result = {
        user: user,
        token: signToken(user)
      };
    }
    catch (err) {
      console.log(err);
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  async signin(user) {
    let result;
    try {
      //return user and token
      result = { user, token: signToken(user) };
    }
    catch (err) {
      throw new HttpExceptionHandler(400, err);
    }
    return result;
  }

  signout() {

  }
}

module.exports = AuthController;