import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import postReducer from './post';
import authReducer from './auth';
import memberReducer from './member';
import pageReducer from './page';
import commentReducer from './comment';
import headerReducer from './header';
import historyReducer from './history';
import userReducer from './user';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  post: postReducer,
  member: memberReducer,
  page: pageReducer,
  comment: commentReducer,
  header: headerReducer,
  history: historyReducer,
  user: userReducer,
});