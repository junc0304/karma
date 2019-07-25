import React , {useRef}from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Form, Button, Alert } from 'react-bootstrap';
import * as actions from '../actions';
import { JUMBOTRON_BG_COMMON } from '../config';
import { signInEmail, signInPassword } from '../helpers';
import CustomInput from './CustomInput';


function SignIn ({ signIn, errorMessage, history }) {

  const formData = useRef({email:'', password:''}).current;
  const valid = useRef({email:false, password: false}).current;

  const onChange = (name, value, validated) => {
    formData[name] = value;
    valid[name] = validated;
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if(valid.email && valid.password) {
      await signIn(formData);
      if (!errorMessage) {
        history.push('/home');
      }
    }
  }

  return (
    <Jumbotron style={{ backgroundColor: JUMBOTRON_BG_COMMON }}>
      <h1 className="display-3">Sign In</h1>
      <p className="lead">Sign in using your Email!</p>
      <hr className="my-3" />
      <Form noValidate onSubmit={onSubmit} >
        <Form.Group>
          <Form.Label>
            Email
          </Form.Label>
          <CustomInput
            required
            name="email"
            type="email"
            onChange={onChange}
            validation={signInEmail} 
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
            onChange={onChange}
            validation={signInPassword} 
          />
        </Form.Group>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} 
        <Button className="d-flex ml-auto" type="submit" variant="light" >
          Sign In
        </Button> 
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
