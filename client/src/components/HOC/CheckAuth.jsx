import React, { useEffect, useState, memo } from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {
  function AuthController({ isAuth, history }) {
    const [showComponent, setShowComponent] = useState(false);
    useEffect(() => {
      if (!isAuth) {
        history.push('/signin');
      }
      setShowComponent(true);
    }, [isAuth, history]);

    return (showComponent && <Component />);
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuthenticated,
      errorMessage: state.auth.signInErrorMessage || state.auth.signUpErrorMessage
    }
  }

  return connect(mapStateToProps)(memo(AuthController));
};

export default CheckAuth;

