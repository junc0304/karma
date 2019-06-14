import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Jumbotron, Form, Alert, Button } from 'react-bootstrap';
import * as actions from '../../actions';
import CustomInput from './CustomInput';

const SignUp = ({ signUp, errorMessage, history, handleSubmit }) => {

  const onSubmit = async (formData) => {
    console.log(formData);
    try{
      await signUp(formData);
    }
    catch(error) {
      errorMessage = "NetworkError Occured"
    }
    if (!errorMessage) {
      history.push('/home');
    } 
  }
  return (
    <Jumbotron>
      <h1 className="display-3">
        Sign Up</h1>
      <p className="lead">
        Sign up & get started today!</p>
      <hr className="my-3" />
      <p className="lead">
        Your account setup</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Row>
          <Form.Group className="col-md-6">
            <Form.Label>
              Email</Form.Label>
            <Field
              name="email"
              type="email"
              id="inputEmail"
              placeholder="Email"
              component={CustomInput} />
            <Form.Text>
              This Email address is going to be your User ID</Form.Text>
          </Form.Group>
          
          <Form.Group className="col-md-6">
            <Form.Label>
              Password</Form.Label>
            <Field
              name="password"
              type="password"
              id="inputPassword"
              placeholder="Password"
              component={CustomInput} />
            <Form.Label>
              Confirm Password</Form.Label>
            <Form.Control
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password" />
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Tell us more!</p>
        <Form.Row>
          <Form.Group className="col-6" >
            <Form.Label>
              Name</Form.Label>
            <Field
              name="name"
              type="text"
              id="inputName"
              placeholder="John Doe"
              component={CustomInput} />
          </Form.Group >
          <Form.Group className="col-6">
            <Form.Label>
              Depot Name</Form.Label>
            <Field
              name="depotName"
              type="text"
              id="inputDepotName"
              placeholder="e.g. Burnaby Return-It bottle depot..."
              component={CustomInput} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-4">
            <Form.Label>
              Units</Form.Label>
            <Field
              name="unit"
              type="text"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
              component={CustomInput} />
          </Form.Group>
          <Form.Group className="col-8">
            <Form.Label>
              Street</Form.Label>
            <Field
              name="address"
              type="text"
              id="inputAddress"
              placeholder="1234 Main St"
              component={CustomInput} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-12 col-lg-4">
            <Form.Label>
              City</Form.Label>
            <Field
              name="city"
              type="text"
              id="inputCity"
              component={CustomInput} />
          </Form.Group >

          <Form.Group className="col-6 col-lg-4">
            <Form.Label>
              Province</Form.Label>
            <Field
              name="province"
              type="text"
              id="inputProvince"
              component={CustomInput} />
          </Form.Group >

          <Form.Group className="col-6 col-lg-4">
            <Form.Label>
              Postal Code</Form.Label>
            <Field
              name="postalCode"
              type="text"
              id="inputPostalCode"
              component={CustomInput} />
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Any comments?</p>
        <Form.Group>
          <Form.Label>
            Comments</Form.Label>
          <Field
            name="comment"
            type="textarea"
            id="inputComment"
            style={{borderRadius:"5px"}}
            component={CustomInput} />
        </Form.Group>
        <Form.Group >
          <Form.Check>
            <Form.Check.Input
              name="notify"
              type="checkbox"
              id="gridCheck" />
            <Form.Label>
              Check to receive email updates from KARMA</Form.Label>
          </Form.Check>
        </Form.Group>
        {errorMessage ?
          <Alert
            variant="danger">
            {errorMessage}</Alert> : null} 
        <Form.Group>
          <Button
            type="submit"
            variant="light"
            className="d-flex ml-auto justify-content-center"
            style={{width:"6rem", height:"3rem", textAlign:"center"}} >
            Submit</Button>
        </Form.Group>
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
  reduxForm({ form: 'signup' })
)(SignUp)
