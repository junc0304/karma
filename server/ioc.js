const {createContainer, asClass, asFunction, InjectionMode} = require('awilix');

const authController = require('./controllers/authController.js');

const postController = require('./controllers/postController.js');
const postDataHandler = require('./classes/PostDataHandler/postDataHandler.js');

const commentController = require('./controllers/commentController.js');
const commentDataHandler = require('./classes/CommentDataHandler/CommentDataHandler.js');

const userController = require('./controllers/userController.js');
const userDataHandler = require('./classes/UserDataHandler/UserDataHandler.js');

const pageController = require('./controllers/pageController.js');
const pageDataHandler = require('./classes/PageDataHandler/pageDataHandler.js');

const historyController = require('./controllers/historyController.js');
const historyDataHandler = require('./classes/HistoryDataHandler/historyDataHandler.js');


const container = createContainer({injectionMode: InjectionMode.CLASSIC});

container.register({
  authController: asClass(authController),
  userController: asClass(userController),
  userDataHandler: asClass(userDataHandler),

  commentController: asClass(commentController),
  commentDataHandler: asClass(commentDataHandler),
  
  postController: asClass(postController),
  postDataHandler: asClass(postDataHandler),

  pageController: asClass(pageController),
  pageDataHandler: asClass(pageDataHandler),

  historyController: asClass(historyController),
  historyDataHandler: asClass(historyDataHandler),
})

global.container = container;