import React, {useEffect, useState, memo} from 'react';
import { connect } from 'react-redux';

const CheckAuth = (Component) => {

  function AuthController ({isAuth, history}) {
    const [showComponent, setShowComponent] = useState(false);
    useEffect(()=> {
      //setShowComponent(false);
      if (!isAuth) {
        history.push('/signin');
      }
     setShowComponent(true);
    }, [isAuth]);

  return ( showComponent && <Component /> );
  }

  const mapStateToProps = (state) => {
    console.log(state)
    return {
      isAuth: state.auth.isAuthenticated,
      errorMessage: state.auth.signInrrorMessage || state.auth.signUpErrorMessage 

    }
  }
  
  return connect(mapStateToProps)(memo(AuthController));
};

export default CheckAuth;

