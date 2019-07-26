import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import CustomInput from './CustomInput';

import * as actions from '../actions';
import { JUMBOTRON_BG_COMMON } from '../config';
import { validateEmailSimple, validatePasswordSimple } from '../helpers';

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
    const handleChange = (name, value, validated) => {
      formData[name] = value;
      valid[name] = validated;
      console.log(name, validated)
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        if (hasErrors(valid)) return;
        await signReset();
        await signIn(formData);
      }
      catch (error) {
        console.log(error)
      }
    }

    const hasErrors = (item) => {
      console.log(item)
      if (!item.length) return false;
      let correct = true;
      Object.values(item).forEach((value) => correct &= value);
      return !correct;
    }

    return (
      <Jumbotron style={{ backgroundColor: JUMBOTRON_BG_COMMON }}>
        <h1 className="display-3">Sign In</h1>
        <p className="lead">Sign in using your Email!</p>
        <hr className="my-3" />
        <Form noValidate onSubmit={handleSubmit} >
          <Form.Group>
            <Form.Label>
              Email
            </Form.Label>
            <CustomInput
              required
              name="email"
              type="email"
              onChange={handleChange}
              validation={validateEmailSimple}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password
            </Form.Label>
            <CustomInput
              required
              name="password"
              type="password"
              onChange={handleChange}
              validation={validatePasswordSimple}
            />
          </Form.Group>
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
          <Button
            className="d-flex ml-auto"
            type="submit"
            variant="light"
          >
            Sign In
          </Button>
        </Form>
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



/*
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignIn);
 */