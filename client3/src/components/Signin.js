import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import * as actions from '../actions';
import CustomInput from './CustomInput';

const SignIn = ({ signIn, errorMessage, history, handleSubmit }) => {

  const onSubmit = async (formData) => {
    await signIn(formData);
    if (!errorMessage) {
      history.push('/home');
    }
  }

  return (
    <Jumbotron>
      <h1 className="display-3">
        Sign In</h1>
      <p className="lead">
        Sign in using your Email!</p>
      <hr className="my-3" />
      <Form 
        onSubmit={handleSubmit(onSubmit)}
        style={{position:"relative"}}>
        <Form.Group 
          controlId="formGroupEmail">
          <Form.Label>
            Email</Form.Label>
          <Field 
            name="email"
            type="email" 
            id="inputEmail" 
            placeholder="Email" 
            component={CustomInput} />
        </Form.Group>
        <Form.Group 
          controlId="formGroupPassword">
          <Form.Label>
            Password</Form.Label>
          <Field 
            name="password"
            type="password" 
            id="inputPassword" 
            placeholder="Password" 
            component={CustomInput} />
        </Form.Group>
        <hr className="my-3" />
          <div style={{position:"relative"}}>
            <Button 
              variant="light"
              style={{position:"absolute", right:"0px"}} >
              Submit</Button>
          </div>
      </Form>
    </Jumbotron>
  );
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' })
)(SignIn);
