import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import * as actions from '../actions';
import { JUMBOTRON_BG_COMMON } from '../config';
import CustomInput from './CustomInput';
import CustomButton from './CustomButton';
import { email, password } from '../helpers';

function SignIn ({ signIn, errorMessage, history }) {
  var formData = { email: '', password: '' };
  //let validated = { email: false, password: false };

  const [validated, setValidated] = useState( { email: false, password: false });
  function onChange(name, value, valid) {
    console.log(name, value)
    formData = { ...formData, [name]: value };
    console.log(formData)
    setValidated ({ ...validated, [name]: valid });
  }

  useEffect(() => {
    console.log(formData, validated)
  }, )

  async function onSubmit (event) {
    event.preventDefault();
    console.log(formData, validated)
    if (validated.email && validated.password) {
      await signIn(formData);
      if (!errorMessage) {
        history.push('/home');
      }
    }
  }

  return (
    <Jumbotron style={{ backgroundColor: JUMBOTRON_BG_COMMON }}>
      <h1 className="display-3">
        Sign In</h1>
      <p className="lead">
        Sign in using your Email!</p>
      <hr className="my-3" />
      <Form
        noValidate
        onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>
            Email</Form.Label>
          <CustomInput
            required
            name="email"
            type="email"
            onChange={onChange}
            validation={email}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password</Form.Label>
          <CustomInput
            required
            name="password"
            type="password"
            onChange={onChange}
            validation={password} />
        </Form.Group>
        {errorMessage &&
          <Alert wait={1000} variant="danger">
            {errorMessage}</Alert>}
        <Button
          className="d-flex ml-auto"
          type="submit"
          variant="light"
        >
          Sign In</Button>
      </Form>
    </Jumbotron>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.signInErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignIn);
