import React, { useEffect } from 'react';
import Header from './layout/header';
import Footer from './layout/footer';
import { connect } from 'react-redux';
import * as actions from '../actions';

const App = (props) => {
  useEffect(() => {
    //
  })
  return (
    <div className="App" style={{ minHeight: window.innerHeight }}>
      <Header />
      <div style={{marginTop:"56px"}}>{props.children}</div>
      <Footer />
    </div>
  );
}

export default connect(null, actions)(App);
