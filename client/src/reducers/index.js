import {combineReducers} from 'redux';
import { reducer as formReducer} from 'redux-form';
import authReducer from './auth';
import boardReducer from './board';

export default combineReducers({
    form: formReducer,
    auth: authReducer,
    board: boardReducer
});