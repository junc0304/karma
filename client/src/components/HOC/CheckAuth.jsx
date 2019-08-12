import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';

export default (Component) => {

  function AuthController(props) {

    useEffect(() => {
      if (!props.isAuth && sessionStorage.getItem("isAuth")) {
        props.history.push('/signin');
      }
    }, [props.isAuth, props.history]);

    return (
      <Component {...props} />
    );
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuthenticated
    }
  }
  return connect(mapStateToProps)(memo(AuthController));
};


