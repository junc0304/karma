import React from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import * as actions from '../actions';
//import BG from './images/karma-bg1.jpg';
import './App.css'

const App = (props) => {
  return (
    <div className='app'>
      <Header/>
      <Container style={{ padding: '25px 25px' }}>
        {props.children}
      </Container>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
