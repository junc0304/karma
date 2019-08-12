import React from 'react';
import { connect } from 'react-redux';
import { Container} from 'react-bootstrap';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import * as actions from '../actions';
import BG from './images/karma-bg1.jpg';
import './App.css'

const App = (props) => {
  return (
    <div 
      className='App' 
      style={{ 
        minHeight: window.innerHeight, 
        minWidth: '370px', 
        WebkitBackgroundSize: 'cover',
        OBackgroundSize:'cover',
        backgroundSize: 'cover',
        backgroundColor:'rgba(255,255,255,0.5)',
        background:`url(${BG}) no-repeat center bottom fixed`, 
        backgroundAttachment: 'fixed' 
      }}
    >
      <Header/>
      <Container style={{ padding: '25px 25px' }}>
        {props.children}
      </Container>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
