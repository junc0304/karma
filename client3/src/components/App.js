import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import Header from './layout/Header';
import Footer from './layout/Footer';
import { connect } from 'react-redux';
import * as actions from '../actions';

const App = (props) => {
  return (
    <div className="App" style={{ minHeight: window.innerHeight}}>
      <Header />
      <Container style={{padding:"25px 25px"}}>
        {props.children}
      </Container>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
