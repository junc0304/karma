import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, ButtonGroup } from 'react-bootstrap';
import CustomInput from './shared/CustomInput';
import * as actions from '../actions';
import { validate, isEmpty } from '../helpers'

const SignUp = (props) => {

  let { isAuth, signUp, history } = props;
  let form = {};
  let formValid = {
    name: false,
    depotName: false,
    email: false,
    password: false,
    address: false,
    city: false,
    province: false,
    postalCode: false
  };

 
  const ViewComponent = () => {

    useEffect(() => {
      if (isAuth) history.push('/home');
      // eslint-disable-next-line
    }, [isAuth]);  

    const handleChange = (name, value, validated) => {
      form[name] = value;
      formValid[name] = validated;
    }
    const handleSubmit = async () => {
      trimSpaces();
      if(isEmpty(form)) return;
      validateForm(formValid) && await signUp(form)
    };
    const trimSpaces = () => 
      Object.entries(form)
        .forEach(([key, value]) => form[key] = value.trim());
    
    const validateForm = () => {
      if(isEmpty(form) || isEmpty(formValid)) return false;
      let noError = true;
       Object.values(formValid)
         .forEach((valid) => noError &= valid );
       return noError;
     }

    return (
      <Jumbotron className='jumbotron-main'>
        <div className='jumbotron-inner-frame' >
          <h1 className='display-3'>Sign Up</h1>
          <p className='lead'>Sign up & get started today!</p>
          <hr className='my-3' />
          <p className='lead'>Your account setup</p>
          <Form noValidate >
            <Form.Row>
              <Form.Group className='col-md-6'>
                <div><strong>Email</strong></div>
                <CustomInput
                  required
                  size='lg'
                  type='email'
                  name='email'
                  onChange={handleChange}
                  validation={validate.email}
                />
                <Form.Text>**Email address is your User ID</Form.Text>
              </Form.Group>
              <PasswordFields onChange={handleChange} validate={validate} />
            </Form.Row>
            <hr className='my-3' />
            <p className='lead'>Tell us more!</p>
            <Form.Row>
              <Form.Group className='col-md-6' >
                <div><strong>Name</strong></div>
                <CustomInput
                  required
                  size='lg'
                  name='name'
                  type='text'
                  placeholder='John Doe'
                  onChange={handleChange}
                  validation={validate.empty}
                />
              </Form.Group >
              <Form.Group className='col-md-6'>
                <div><strong>Depot Name</strong></div>
                <CustomInput
                  required
                  size='lg'
                  name='depotName'
                  type='text'
                  placeholder='e.g. Burnaby Return-It bottle depot...'
                  onChange={handleChange}
                  validation={validate.empty}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className='col-md-4'>
                <div><strong>Units</strong></div>
                <CustomInput
                  size='lg'
                  name='unit'
                  type='text'
                  onChange={handleChange}
                  placeholder='Apartment, studio, or floor'
                />
              </Form.Group>
              <Form.Group className='col-md-8'>
                <div><strong>Street</strong></div>
                <CustomInput
                  required
                  size='lg'
                  name='address'
                  type='text'
                  placeholder='1234 Main St'
                  onChange={handleChange}
                  validation={validate.empty}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group className='col-md-4'>
                <div><strong>City</strong></div>
                <CustomInput
                  required
                  size='lg'
                  name='city'
                  type='text'
                  onChange={handleChange}
                  validation={validate.emptySelection}
                  style={{ fontSize: '1.1rem' }}
                />
              </Form.Group >
              <Form.Group className='col-md-4'>
                <div><strong>Province</strong></div>
                <CustomInput
                  required
                  size='lg'
                  as='select'
                  name='province'
                  type='text'
                  onChange={handleChange}
                  validation={validate.emptySelection}
                  style={{ fontSize: '1.1rem' }}
                >
                  <option value={''} />
                  <option>BC</option>
                </CustomInput>
              </Form.Group >
              <Form.Group className='col-md-4'>
                <div><strong>Postal Code</strong></div>
                <CustomInput
                  required
                  size='lg'
                  name='postalCode'
                  type='text'
                  onChange={handleChange}
                  validation={validate.postalCode}
                />
              </Form.Group>
            </Form.Row>
            <hr className='my-3' />
            <p className='lead'>Any comments?</p>
            <Form.Group>
              <div><strong>Comments</strong></div>
              <CustomInput
                as='textarea'
                size='lg'
                rows='3'
                name='comment'
                type='textarea'
                onChange={handleChange}
                style={{ borderRadius: '5px', resize: 'none' }}
              />
            </Form.Group>
            <Form.Group >
              <Form.Check>
                <Form.Check.Input
                  size='lg'
                  name='notify'
                  type='checkbox'
                  id='gridCheck'
                />
                <div><strong>Check to receive email updates from KARMA</strong></div>
              </Form.Check>
            </Form.Group>
            <Form.Group>
              <ButtonGroup className='d-flex '>
                <Button
                  variant='light'
                  onClick={handleSubmit}
                  className='ml-auto btn-main'
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
  return <ViewComponent />
}

const PasswordFields = ({ onChange, confirmed, validate, edit }) => {
  const [password, setPassword] = useState('');
  const handleConfirmChange = (name, value, validate) => [onChange("password", password, password === value)]
  const handlePasswordChange = (name, value, validate) => [setPassword(value)];
  return (
    <Form.Group className="col-md-6" >
      <div><strong>Password:</strong></div>
      <CustomInput
        required
        size='lg'
        name='password'
        type='password'
        placeholder='Password'
        onChange={handlePasswordChange}
        edit={edit}
        validation={validate.password}
      />
      <div><strong>Confirm Password:</strong></div>
      <CustomInput
        required
        size='lg'
        type='password'
        name='passwordConfirm'
        onChange={handleConfirmChange}
        edit={edit}
        password={password}
        validation={validate.confirmPassword}
        placeholder='Confirm Password'
      />
    </Form.Group>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuthenticated,
    errorMessage: state.auth.signUpErrorMessage
  }
}

export default connect(mapStateToProps, actions)(SignUp)
