import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Alert, Button, ButtonGroup } from 'react-bootstrap';
import * as actions from '../actions';
import { CITIES_IN_BC, EMAIL_REGEX, PASSWORD_REGEX, POSTAL_CODE_REGEX } from '../config'

const SignUp = ({ signUp, errorMessage, history }) => {
  const [formData, setFormData] = useState({email:'', password:'', name:'', depotName:'', address:'', city:'', province:'', postalCode:'' });
  const [error, setError] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    if(hasErrors(error)) return;

    await signUp(formData);
    if (!errorMessage) {
      history.push('/home');
    }
  }

  const onChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    validateInput(event);
  }

  const onChangePosttalCode = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value.toUpperCase() });
    validateInput(event);
  }

  const validateInput = (event) => {
    const { name, value } = event.target;
    event.target.value = value.trim();
    switch (name) {
      case "email":
        setError({ ...error, [name]: 
            !value.match(EMAIL_REGEX) ? "Please enter a valid email address to use as your User ID." :null})
        break;
      case "password":
        setError({ ...error, [name]: 
            !value || value.length < 8 || value.length > 16 ? "Password must have 8 to 16 characters." 
              :!value.match(PASSWORD_REGEX) ? "Password must contain at least one lowercase letter, one uppercase letter, and one numeric digit.": null });
        break;
      case "passwordConfirm":
        setError({ ...error, [name]: 
            formData.password && value !== formData.password ? "Password and confirm password does not match."  : null });
        break;
      case "name":
        setError({ ...error, [name]:  !value? "Please enter your name." : null })
        break;
      case "depotName":
        setError({ ...error, [name]:  !value? "Please enter your depot name.":null})
        break;
      case "address":
        setError({ ...error, [name]:  !value? "Please enter an address.":null})
        break;
      case "city":
        setError({ ...error, [name]:  !value || !value.length? "Please choose a city." : null })
        break;
      case "province":
        setError({ ...error, [name]:  !value || !value.length? "Please choose a province." : null })
        break;
      case "postalCode":
        setError({ ...error, [name]:  
          !value ? "Please enter a postal code." 
            :!value.match(POSTAL_CODE_REGEX) ? "Please enter a valid postal code." : null})
        break;
      default:
        break;
    }
  };

  const hasErrors = ({ email, password, name, depotName, address, city, province, postalCode }) => {
    return email !== null || password !== null || name !== null || depotName !== null || address !== null || city !== null || province !== null || postalCode !== null;
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
      <Form noValidate onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group className="col-md-6">
            <Form.Label>
              Email</Form.Label>
            <Form.Control
              required
              autoComplete="username"
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              isInvalid={error.email} />
          <Form.Control.Feedback type="invalid">
            {error.email}</Form.Control.Feedback>
            <Form.Text>
              **This Email address is your User ID</Form.Text>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>
              Password</Form.Label>
            <Form.Control
              required
              autoComplete="new-password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}      
              isInvalid={error.password} />
              <Form.Control.Feedback type="invalid">
                {error.password}</Form.Control.Feedback>
            <Form.Label>
              Confirm Password</Form.Label>
            <Form.Control
              required
              type="password"
              name="passwordConfirm"
              onChange={validateInput}
              placeholder="Confirm Password" 
              isInvalid={error.passwordConfirm} />
              <Form.Control.Feedback type="invalid">
                {error.passwordConfirm}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Tell us more!</p>
        <Form.Row>
          <Form.Group className="col-6" >
            <Form.Label>
              Name</Form.Label>
            <Form.Control
              required
              name="name"
              type="text"
              value={formData.name}
              placeholder="John Doe"
              onChange={onChange}
              isInvalid={error.name} />
              <Form.Control.Feedback type="invalid">
                {error.name}</Form.Control.Feedback>
          </Form.Group >
          <Form.Group className="col-6">
            <Form.Label>
              Depot Name</Form.Label>
            <Form.Control
              required
              name="depotName"
              type="text"
              value={formData.depotName}
              placeholder="e.g. Burnaby Return-It bottle depot..."
              onChange={onChange}   
              isInvalid={error.depotName} />
              <Form.Control.Feedback type="invalid">
                {error.depotName}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-4">
            <Form.Label>
              Units</Form.Label>
            <Form.Control
              name="unit"
              type="text"
              value={formData.unit||""}
              onChange={onChange}
              placeholder="Apartment, studio, or floor"/>
          </Form.Group>
          <Form.Group className="col-8">
            <Form.Label>
              Street</Form.Label>
            <Form.Control
              required
              name="address"
              type="text"
              value={formData.address}
              placeholder="1234 Main St"
              onChange={onChange}     
              isInvalid={error.address} />
              <Form.Control.Feedback type="invalid">
                {error.address}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-4">
            <Form.Label>
              City</Form.Label>
            <Form.Control
              required
              as="select"
              name="city"
              type="text"
              value={formData.city}
              onChange={onChange}
              required
              isInvalid={error.city} >
              <option> </option>
              {CITIES_IN_BC.map((item, index) =>
                <option key={index}> {item} </option>)}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {error.city}</Form.Control.Feedback>
          </Form.Group >
          <Form.Group className="col-4">
            <Form.Label>
              Province</Form.Label>
            <Form.Control
              required
              as="select"
              name="province"
              type="text"
              value={formData.province}
              onChange={onChange}
              isInvalid={error.province}>
              <option> </option>
              <option>British Columbia</option>
             {/*  { PROVINCES_IN_CANADA.map((item, index) =>
                <option key={`${index}_${item}`}>{item}</option>)} */}
              </Form.Control>
              <Form.Control.Feedback type="invalid">
                {error.province}</Form.Control.Feedback>
          </Form.Group >
          <Form.Group className="col-4">
            <Form.Label>
              Postal Code</Form.Label>
            <Form.Control
              required
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={onChangePosttalCode}
              isInvalid={error.postalCode} />
              <Form.Control.Feedback type="invalid">
                {error.postalCode}</Form.Control.Feedback>
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Any comments?</p>
        <Form.Group>
          <Form.Label>
            Comments</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            name="comment"
            type="textarea"
            value={formData.comment||""}
            onChange={onChange}
            style={{ borderRadius: "5px", resize:"none" }} />
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
          <ButtonGroup className="d-flex">
            <Button
              type="submit"
              variant="light"
              disabled={hasErrors(error)}
              className="ml-auto" >
              Submit</Button>
          </ButtonGroup>
        </Form.Group>
      </Form>
    </Jumbotron>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.signUpErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignUp)
