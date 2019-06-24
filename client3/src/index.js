import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

//page
import App from './components/App';
import Home from './components/Home';
import History from './components/History';
import Summary from './components/Summary';
import Membership from './components/Membership';
import Member from './components/Member';
import Meeting from './components/Meeting';
import Event from './components/Event';
import Discussion from './components/Discussion';
import Notice from './components/Notice';
import SignIn from './components/Signin';
import SignUp from './components/Signup';

import reducers from './reducers';

axios.defaults.withCredentials = true;
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path="/home" component={Home} />
        <Route exact path="/history" component={History} />
        <Route exact path="/summary" component={Summary} />
        <Route exact path="/howtojoin" component={Membership} />
        <Route exact path="/member" component={Member} />
        <Route exact path="/meeting" component={Meeting} />
        <Route exact path="/event" component={Event} />
        <Route exact path="/notice" component={Notice} />
        <Route exact path="/Discussion" component={Discussion} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));//getElementById('root'));
serviceWorker.register();
