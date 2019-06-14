import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import boardReducer from './board';
import authReducer from './auth';
import memberReducer from './member';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    board: boardReducer,
    member: memberReducer
});