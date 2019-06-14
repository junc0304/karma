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
import Home from './components/views/Home';
import History from './components/views/History';
import Summary from './components/views/Summary';
import Membership from './components/views/Membership';
import MemberList from './components/views/MemberList';
import Meeting from './components/views/Meeting';
import Event from './components/views/Event';
import Discussion from './components/views/Discussion';
import Notice from './components/views/Notice';
import SignIn from './components/views/Signin';
import SignUp from './components/views/Signup';

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
        <Route exact path="/memberlist" component={MemberList} />
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
