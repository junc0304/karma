import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import CustomInput from './shared/CustomInput';

import * as actions from '../actions';
import { validate } from '../helpers';

const SignIn = ({ isAuthenticated, history, ...props }) => {

  let formData = { email: '', password: '' };
  let valid = { email: false, password: false };

  useEffect(() => {
    let checkAuth = () => {
      if (isAuthenticated) {
        history.push('/home');
      }
    }
    checkAuth();
  }, [isAuthenticated, history]);

  const ViewSignIn = ({ signIn, signReset, errorMessage }) => {
    const handleChange = (name, value, validated) => [formData[name] = value, valid[name] = validated];
    const handleSubmit = async (event) => {
      event.preventDefault();
      if (hasErrors(valid)) return;
      await signReset();
      await signIn(formData);
    }
    const hasErrors = (item) => {
      if (!item.length) return false;
      let correct = true;
      Object.values(item).forEach((value) => correct &= value);
      return !correct;
    }

    return (
      <Jumbotron className='jumbotron-main'>
        <div className='jumbotron-inner-frame' >
          <h1 className='display-3'>Sign In</h1>
          <p className='lead'>Sign in with your Email!</p>
          <hr className='my-3' />

          <Form noValidate onSubmit={handleSubmit} >
            <Form.Group style={{ minHeight: '102px' }}>
              <Form.Label>Email</Form.Label>
              <CustomInput
                required
                size='lg'
                name='email'
                type='email'
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
                onChange={handleChange}
                validation={validate.simplePassword}
              />
            </Form.Group>
            {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
            <Button
              className='d-flex ml-auto btn-main'
              type='submit'
              variant='light'
            >
              Sign In
          </Button>
          </Form>
        </div>
      </Jumbotron>
    );
  }
  return <ViewSignIn {...props} />
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignIn);