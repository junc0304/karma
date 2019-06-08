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
import Home from './components/views/about/Home';
import History from './components/views/about/History';
import Summary from './components/views/about/Summary';
import HowToJoin from './components/views/member/HowToJoin';
import MemberList from './components/views/member/MemberList';
import Meeting from './components/views/boards/Meeting';
import Event from './components/views/boards/Event';
import Dicusssion from './components/views/boards/Discussion';
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
        <Route exact path="/howtojoin" component={HowToJoin} />
        <Route exact path="/memberlist" component={MemberList} />
        <Route exact path="/meeting" component={Meeting} />
        <Route exact path="/event" component={Event} />
        <Route exact path="/discussion" component={Dicusssion} />
      </App>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));//getElementById('root'));
serviceWorker.register();
