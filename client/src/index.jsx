import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter, Route } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';

import CheckAuth from './components/HOC/CheckAuth.jsx'

//page
import App from './components/App.jsx';
import Home from './components/Home.jsx';
import History from './components/History.jsx';
import Summary from './components/Summary.jsx';
import Membership from './components/Membership.jsx';
import Member from './components/Member.jsx';
import Meeting from './components/Meeting.jsx';
import Event from './components/Event.jsx';
import Discussion from './components/Discussion.jsx';
import Notice from './components/Notice.jsx';
import SignIn from './components/Signin.jsx';
import SignUp from './components/Signup.jsx';
import Profile from './components/Profile.jsx';
import reducers from './reducers';

axios.defaults.withCredentials = true;
const store = createStore(reducers, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route exact path='/home' component={CheckAuth(Home)} />
        <Route exact path='/history' component={CheckAuth(History)} />
        <Route exact path='/summary' component={CheckAuth(Summary)} />
        <Route exact path='/howtojoin' component={CheckAuth(Membership)} />
        <Route exact path='/member' component={CheckAuth(Member)} />
        <Route exact path='/meeting' component={CheckAuth(Meeting)} />
        <Route exact path='/event' component={CheckAuth(Event)} />
        <Route exact path='/notice' component={CheckAuth(Notice)} />
        <Route exact path='/Discussion' component={CheckAuth(Discussion)} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/' component={SignIn} />
        <Route exact path='/profile' component={CheckAuth(Profile)} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
serviceWorker.register();
