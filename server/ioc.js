const {createContainer, asClass, asFunction, InjectionMode} = require('awilix');

const authController = require('./controllers/AuthController.js');
const postController = require('./controllers/PostController.js');
const postDataHandler = require('./classes/PostDataHandler/postDataHandler.js/index.js');

const userController = require('./controllers/UserController.js');
const userDataHandler = require('./classes/UserDataHandler/UserDataHandler.js');

const commentController = require('./controllers/commentController.js');

const container = createContainer({injectionMode: InjectionMode.CLASSIC});

container.register({
  authController: asClass(authController),
  userController: asClass(userController),
  userDataHandler: asClass(userDataHandler).singleton(),

  postController: asClass(postController),
  commentController: asClass(commentController),
  postDataHandler: asClass(postDataHandler).singleton()
})

global.container = container;