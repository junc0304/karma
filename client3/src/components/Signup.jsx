import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Alert, Button, ButtonGroup } from 'react-bootstrap';
import * as actions from '../actions';
import { CITIES_IN_BC } from '../config'
import CustomInput from './CustomInput';
import { userEmail, userAddress, userCity, userConfirmPassword, depotName, userName, userPassword, userPostalCode, userProvince } from '../helpers'

const SignUp = ({ signUp, errorMessage, history }) => {
  /* const [formData, setFormData] = useState({email:'', password:'', name:'', depotName:'', address:'', city:'', province:'', postalCode:'' });
  const [error, setError] = useState({}); */
  const [confirmPassword, setConfirmPassword] = useState(true);
  const formData = useRef({ email: '', password: '', name: '', depotName: '', address: '', city: '', province: '', postalCode: '' }).current;
  const valid = useRef({ email: '', password: null, name: null, depotName: null, address: null, city: null, province: null, postalCode: null }).current;

  const onSubmit = async (event) => {
    event.preventDefault();

    if(!hasErrors(valid)) {
      console.log("canceled")
      return;
    }
    await signUp(formData);
    if (!errorMessage) {
      history.push('/home');
    }
  }

  const onChange = (name, value, validated) => {
    formData[name] = value;
    valid[name] = validated;
  }

  const onPasswordConfirmChange = (name, value, validated) => {
    setConfirmPassword(value===formData.password)
  }
  
  const hasErrors = (item)=> {
    let correct = confirmPassword;
    Object.values(item).map((value)=> correct &= value==null );
    return correct;
  }

  return (
    <Jumbotron>
      <h1 className="display-3">
        Sign Up
      </h1>
      <p className="lead">
        Sign up & get started today!
      </p>
      <hr className="my-3" />
      <p className="lead">
        Your account setup
      </p>
      <Form noValidate onSubmit={onSubmit}>
        <Form.Row>
          <Form.Group className="col-md-6">
            <Form.Label>
              Email
            </Form.Label>
            <CustomInput
              required
              type="email"
              name="email"
              onChange={onChange}
              validation={userEmail}
            />
            <Form.Text>
              **This Email address is your User ID
            </Form.Text>
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>
              Password</Form.Label>
            <CustomInput
              required
              name="password"
              type="password"
              placeholder="Password"
              onChange={onChange}
              validation={userPassword}
            />
            <Form.Label>
              Confirm Password
            </Form.Label>
            <CustomInput
              required
              type="password"
              name="passwordConfirm"
              onChange={onPasswordConfirmChange}
              password={formData.password}
              isInvalid={!confirmPassword}
              validation={userConfirmPassword}
              placeholder="Confirm Password"
            />
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Tell us more!
        </p>
        <Form.Row>
          <Form.Group className="col-6" >
            <Form.Label>
              Name
            </Form.Label>
            <CustomInput
              required
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={onChange}
              validation={userName}
            />
          </Form.Group >
          <Form.Group className="col-6">
            <Form.Label>
              Depot Name
            </Form.Label>
            <CustomInput
              required
              name="depotName"
              type="text"
              placeholder="e.g. Burnaby Return-It bottle depot..."
              onChange={onChange}
              validation={depotName}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-4">
            <Form.Label>
              Units
            </Form.Label>
            <CustomInput
              name="unit"
              type="text"
              onChange={onChange}
              placeholder="Apartment, studio, or floor"
            />
          </Form.Group>
          <Form.Group className="col-8">
            <Form.Label>
              Street
            </Form.Label>
            <CustomInput
              required
              name="address"
              type="text"
              placeholder="1234 Main St"
              onChange={onChange}
              validation={userAddress}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group className="col-4">
            <Form.Label>
              City
            </Form.Label>
            <CustomInput
              required
              as="select"
              name="city"
              type="text"
              onChange={onChange}
              validation={userCity}
            >
              <option value={""} />
              {CITIES_IN_BC.map((item, index) =><option key={index}> {item} </option>)}
            </CustomInput>
          </Form.Group >
          <Form.Group className="col-4">
            <Form.Label>
              Province
            </Form.Label>
            <CustomInput
              required
              as="select"
              name="province"
              type="text"
              onChange={onChange}
              validation={userProvince}
            >
              <option value={""} />
              <option>British Columbia</option>
            </CustomInput>
          </Form.Group >
          <Form.Group className="col-4">
            <Form.Label>
              Postal Code
            </Form.Label>
            <CustomInput
              required
              name="postalCode"
              type="text"
              onChange={onChange}
              validation={userPostalCode}
            />
          </Form.Group>
        </Form.Row>
        <hr className="my-3" />
        <p className="lead">
          Any comments?
        </p>
        <Form.Group>
          <Form.Label>
            Comments
          </Form.Label>
          <CustomInput
            as="textarea"
            rows="3"
            name="comment"
            type="textarea"
            onChange={onChange}
            style={{ borderRadius: "5px", resize: "none" }}
          />
        </Form.Group>
        <Form.Group >
          <Form.Check>
            <Form.Check.Input
              name="notify"
              type="checkbox"
              id="gridCheck" 
            />
            <Form.Label>
              Check to receive email updates from KARMA
            </Form.Label>
          </Form.Check>
        </Form.Group>
        {errorMessage ? (
          <Alert variant="danger">
            {errorMessage}
          </Alert>
        ) :null
        }
        <Form.Group>
          <ButtonGroup className="d-flex">
            <Button
              type="submit"
              variant="light"
              className="ml-auto" 
            >
              Submit
            </Button>
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
