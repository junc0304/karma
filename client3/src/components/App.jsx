import React from 'react';
import { connect } from 'react-redux';
import { Container, Jumbotron } from 'react-bootstrap';

import Header from './layout/Header.jsx';
import Footer from './layout/Footer.jsx';
import * as actions from '../actions';
import BG from './images/Rocky4.jpg'
const App = (props) => {
  return (
    <div className="App" style={{ minHeight: window.innerHeight, minWidth: "370px", backgroundImage:`url(${BG})` }}>
      <Header />
      <Container style={{ padding: "25px 25px" }}>
        {props.children}</Container>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
