import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import CustomInput from './shared/CustomInput';

import * as actions from '../actions';
import { validate, isEmpty } from '../helpers';

const SignIn = (props) => {
  let { isAuth, history, signIn, errorMessage } = props;
  let form = { };
  let formValid = { email: false, password: false };

  const ViewSignIn = () => {

    useEffect(() => {
      if (isAuth) history.push('/home');
      // eslint-disable-next-line
    }, [isAuth]);

    const handleChange = (name, value, validated) => {
      form[name] = value;
      formValid[name] = validated
    };

    const handleSubmit = async () => {
      if(isEmpty(form)) return;
      validateForm() && await signIn(form);
    };

    const validateForm = () => {
      if(isEmpty(form) || isEmpty(formValid)) return false;     
      let noError = true;
      Object.values(formValid)
        .forEach((valid) => noError &= valid );
      return noError;
    }

    return (
      <Jumbotron className='jumbotron-main'>
        <div className='jumbotron-inner-frame' >
          <h1 className='display-3'>Sign In</h1>
          <p className='lead'>Sign in with your Email!</p>
          <hr className='my-3' />

          <Form noValidate >
            <Form.Group style={{ minHeight: '102px' }}>
              <Form.Label>Email</Form.Label>
              <CustomInput
                required
                size='lg'
                name='email'
                type='email'
                autoComplete='username'
                onChange={handleChange}
                validation={validate.simpleEmail}
              />
            </Form.Group>
            <Form.Group style={{ minHeight: '102px' }}>
              <Form.Label>Password</Form.Label>
              <CustomInput
                required
                size='lg'
                name='password'
                type='password'
                autoComplete='current-passowrd'
                onChange={handleChange}
                validation={validate.simplePassword}
              />
            </Form.Group>
            {errorMessage && (
              <Alert variant='danger'>
                {errorMessage}
              </Alert>
            )}
            <Button
              className='d-flex ml-auto btn-main'
              onClick={handleSubmit}
              variant='light'
            >
              Sign In
          </Button>
          </Form>
        </div>
      </Jumbotron>
    );
  }
  return <ViewSignIn />
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignIn);