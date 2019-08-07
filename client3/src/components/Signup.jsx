import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Alert, Button, ButtonGroup } from 'react-bootstrap';
import CustomInput from './shared/CustomInput';
import * as actions from '../actions';
import { CITIES_IN_BC, JUMBOTRON_BG_COMMON } from '../config'
import { validate } from '../helpers'

const SignUp = props => {

  const formData = {};
  const validationError = {};

  const ViewComponent = ({ signUp, errorMessage, history }) => {
    const [confirmPassword, setConfirmPassword] = useState(true);

    const onChange = (name, value, validated) => [formData[name] = value, validationError[name] = validated];
    const onPasswordConfirmChange = (name, value, validated) => setConfirmPassword(value === formData.password)
    const hasErrors = (item) => {
      if (!item.length) return false;
      let correct = confirmPassword;
      Object.values(item).forEach((value) => correct &= value);
      return !correct;
    }
    const trimSpaces = (data) => {
      Object.entries(data).forEach(([key, value]) => {
        data[key] = value.trim();
      });
      return data;
    }

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

    return (
      <Jumbotron  className="jumbotron-main">
          <div className="jumbotron-inner-frame" >
        <h1 className="display-3">Sign Up</h1>
        <p className="lead">Sign up & get started today!</p>
        <hr className="my-3" />
        <p className="lead">Your account setup</p>
        <Form noValidate onSubmit={onSubmit}>
          <Form.Row>
            <Form.Group className="col-md-6">
              <div><strong>Email</strong></div>
              <CustomInput
                required
                size="lg"
                type="email"
                name="email"
                onChange={onChange}
                validation={validate.email}
              />
              <Form.Text>**Email address is your User ID</Form.Text>
            </Form.Group>
            <Form.Group className="col-md-6">
              <div><strong>
                Password</strong></div>
              <CustomInput
                required
                size="lg"
                name="password"
                type="password"
                placeholder="Password"
                onChange={onChange}
                validation={validate.password}
              />
              <div><strong>Confirm Password</strong></div>
              <CustomInput
                required
                size="lg"
                type="password"
                name="passwordConfirm"
                onChange={onPasswordConfirmChange}
                password={formData.password}
                isInvalid={!confirmPassword}
                validation={validate.confirmPassword}
                placeholder="Confirm Password"
              />
            </Form.Group>
          </Form.Row>
          <hr className="my-3" />
          <p className="lead">Tell us more!</p>
          <Form.Row>
            <Form.Group className="col-6" >
              <div><strong>Name</strong></div>
              <CustomInput
                required
                size="lg"
                name="name"
                type="text"
                placeholder="John Doe"
                onChange={onChange}
                validation={validate.empty}
              />
            </Form.Group >
            <Form.Group className="col-6">
              <div><strong>Depot Name</strong></div>
              <CustomInput
                required
                size="lg"
                name="depotName"
                type="text"
                placeholder="e.g. Burnaby Return-It bottle depot..."
                onChange={onChange}
                validation={validate.empty}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-4">
              <div><strong>Units</strong></div>
              <CustomInput
                size="lg"
                name="unit"
                type="text"
                onChange={onChange}
                placeholder="Apartment, studio, or floor"
              />
            </Form.Group>
            <Form.Group className="col-8">
              <div><strong>Street</strong></div>
              <CustomInput
                required
                size="lg"
                name="address"
                type="text"
                placeholder="1234 Main St"
                onChange={onChange}
                validation={validate.empty}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group className="col-4">
              <div><strong>City</strong></div>
              <CustomInput
                required
                size="lg"
                as="select"
                name="city"
                type="text"
                onChange={onChange}
                validation={validate.emptySelection}
              >
                <option value={""} />
                {CITIES_IN_BC.map((item, index) => <option key={index}> {item} </option>)}
              </CustomInput>
            </Form.Group >
            <Form.Group className="col-4">
              <div><strong>Province</strong></div>
              <CustomInput
                required
                size="lg"
                as="select"
                name="province"
                type="text"
                onChange={onChange}
                validation={validate.emptySelection}
              >
                <option value={""} />
                <option>BC</option>
              </CustomInput>
            </Form.Group >
            <Form.Group className="col-4">
              <div><strong>Postal Code</strong></div>
              <CustomInput
                required
                size="lg"
                name="postalCode"
                type="text"
                onChange={onChange}
                validation={validate.postalCode}
              />
            </Form.Group>
          </Form.Row>
          <hr className="my-3" />
          <p className="lead">Any comments?</p>
          <Form.Group>
            <div><strong>
              Comments
            </strong></div>
            <CustomInput
              as="textarea"
              size="lg"
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
                size="lg"
                name="notify"
                type="checkbox"
                id="gridCheck"
              />
              <div><strong>Check to receive email updates from KARMA</strong></div>
            </Form.Check>
          </Form.Group>
          {errorMessage ? (
            <Alert variant="danger">
              {errorMessage}
            </Alert>
          ) : null
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
        </div>
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
