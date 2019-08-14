import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { session } from '../../helpers';

export default (Component) => {

  function AuthController(props) {
    useEffect(() => {
      if (!props.isAuth && session.isAuth()) {
        props.signRefresh(session.isAuth(), session.isAdmin(), session.userId());
      }// eslint-disable-next-line
    }, []);

    useEffect(() => {
      if (!props.isAuth) {
        props.history.push('/signin');
      }
    });

    return (<Component {...props} />);
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuthenticated
    }
  }
  return connect(mapStateToProps,actions)(memo(AuthController));
};


