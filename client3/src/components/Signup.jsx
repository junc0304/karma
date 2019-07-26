import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Alert, Button, ButtonGroup } from 'react-bootstrap';
import * as actions from '../actions';
import { CITIES_IN_BC } from '../config'
import CustomInput from './CustomInput';
import { validateEmail, validatePassword, validateConfirmPassword, validateEmpty, validatePostalCode } from '../helpers'

const SignUp = props => {

  const formData = {};
  const validationError = {};

  const ViewComponent = ({ signUp, errorMessage, history }) => {
    const [ confirmPassword, setConfirmPassword ] = useState(true);

    const onSubmit = async (event) => {
      event.preventDefault();
      if (hasErrors(validationError)) {
        return;
      }
      await signUp(trimSpaces(formData));
      if (!errorMessage) {
        history.push('/home');
      }
    }

    const onChange = (name, value, validated) => {
      formData[name] = value;
      validationError[name] = validated;
    }

    const onPasswordConfirmChange = (name, value, validated) => {
      setConfirmPassword(value === formData.password)
    }

    const hasErrors = (item) => {
      if(!item.length) return false;
      let correct = confirmPassword;
      Object.values(item).forEach((value) => correct &= value );
      return !correct;
    }
    
    const trimSpaces = (data) => {
      console.log(data, typeof(data));
      Object.entries(data).forEach(([key, value]) => {
        data[key]= value.trim();
      });
      return data;
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
                validation={validateEmail}
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
                validation={validatePassword}
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
                validation={validateConfirmPassword}
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
                validation={validateEmpty}
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
                validation={validateEmpty}
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
                validation={validateEmpty}
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
                validation={validateEmpty}
              >
                <option value={""} />
                {CITIES_IN_BC.map((item, index) => <option key={index}> {item} </option>)}
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
                validation={validateEmpty}
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
                validation={validatePostalCode}
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
            ) 
            : null
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
  return <ViewComponent {...props} />
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.signUpErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignUp)
