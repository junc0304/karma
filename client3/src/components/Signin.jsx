import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import * as actions from '../actions';
import { JUMBOTRON_BG_COMMON, EMAIL_REGEX } from '../config';
import { GestureSharp } from '@material-ui/icons';
import CustomInput from './CustomFormControl';
const SignIn = ({ signIn, getUser, errorMessage, history }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState({ email: '', password: '' });

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    validateInput(event);
  }

  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      await signIn(formData);
      if (!errorMessage) {
        await history.push('/home');
      }
    }
    catch {
      await history.push('/signin');
    }
  }

  const validateInput = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setError({ ...error, [name]: !value.match(EMAIL_REGEX) ? "Invalid Email" : null });
        break;
      case "password":
        setError({ ...error, [name]: null });
        /* setError({ ...error, [name]: 
          !value || value.length < 8 || value.length > 16 ? "Password length has to be 8 to 16" : null });
         */break;
      default:
        break;
    }
  };


  const [edit, setEdit] = useState(false);

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

<Button onClick={()=>setEdit(!edit)}>aaa</Button>
      <CustomInput
        name="name"
        edit={edit}
        as="textarea"
        defaultValue={"aaa"}
      />


        <Form.Group>
          <Form.Label>
            Email</Form.Label>
          <Form.Control
            required
            autoComplete="username"
            name="email"
            type="email"
            value={formData.email}
            onChange={onChange}
            isInvalid={error.email} />
          <Form.Control.Feedback type="invalid">
            {error.email}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label>
            Password</Form.Label>
          <Form.Control
            required
            autoComplete="current-password"
            name="password"
            type="password"
            value={formData.password}
            onChange={onChange}
            isInvalid={error.password} />
          <Form.Control.Feedback type="invalid">
            {error.password}</Form.Control.Feedback>
        </Form.Group>
        {errorMessage &&
          <Alert variant="danger">
            {errorMessage}</Alert>}
        <Button
          className="d-flex ml-auto"
          type="submit"
          variant="light"
          disabled={error.email !== null || error.password !== null}>
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
