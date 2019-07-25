import React, {useEffect, useState, memo} from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {

  function AuthController ({isAuth, history}) {
    const [showComponent, setShowComponent] = useState(false);
    useEffect(()=> {
      setShowComponent(false);
      if (!isAuth) {
        history.push('/signin');
      }
      setShowComponent(true);
    });
  return ( showComponent && <Component /> );
  }

  const mapStateToProps = (state) => {
    return {
      isAuth: state.auth.isAuthenticated
    }
  }
  
  return connect(mapStateToProps)(memo(AuthController));
};

export default CheckAuth;

