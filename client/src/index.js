import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route } from 'react-router-dom'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import axios from 'axios';


import Home from './components/screens/Home';
import Greeting from './components/screens/Greetings';
import SignUp from './components/screens/SignUp';
import SignIn from './components/screens/SignIn';
import Event from './components/screens/Event';
import Meeting from './components/screens/Meeting';
import Notice from './components/screens/Notice';
import QA from './components/screens/Question';
import reducers from './reducers';
import authGuard from './components/HOCs/authGuard';
import History from './components/screens/History';
import Conditions from './components/screens/Conditions';
import Test from './components/screens/TestDraft';

const jwtToken = localStorage.getItem('JWT_TOKEN');
axios.defaults.headers.common['Authorization'] = jwtToken;

ReactDOM.render(
    <Provider store = {createStore(reducers, {
        auth: {
            token: jwtToken,
            isAuthenticated: jwtToken ? true : false
        },
    }, applyMiddleware(reduxThunk))}  >
        <BrowserRouter>
            <App>
                <Route exact path="/" component={Test} />
                <Route exact path="/Home" component={Home} />
                <Route exact path="/membership/conditions" component={Conditions} />
                <Route exact path="/about/greeting" component={authGuard(Greeting)} />
                <Route exact path="/about/history" component={authGuard(History)} />
                <Route exact path="/SignUp" component={SignUp} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/board/meeting" component={authGuard(Meeting)} />
                <Route exact path="/board/free" component={authGuard(QA)} />
                <Route exact path="/board/notice" component={authGuard(Notice)} />
                <Route exact path="/board/event" component={authGuard(Event)} />
            </App>
        </BrowserRouter>
    </Provider>
    , document.querySelector('#root'));
serviceWorker.unregister();