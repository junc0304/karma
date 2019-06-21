import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import postReducer from './post';
import authReducer from './auth';
import memberReducer from './member';
import pageReducer from './page';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    post: postReducer,
    member: memberReducer,
    page: pageReducer
});