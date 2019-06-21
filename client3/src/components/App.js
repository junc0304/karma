import React from 'react';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import Header from './layout/Header';
import Footer from './layout/Footer';
import * as actions from '../actions';

const App = (props) => {
  return (
    <div className="App" style={{ minHeight: window.innerHeight, minWidth:"370px"}}>
      <Header />
      <Container style={{padding:"25px 25px"}}>
        {props.children}</Container>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
