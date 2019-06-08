import React from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const SubmitButton = ({ className, variant, type, text }) => {
  return (
    <Button className={className} variant={variant} type={type} >
      {text}
    </Button>
  );
}

const SigninForm = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const res = await axios.
    fetch('/', {
      method: 'POST',
      body: data,
    }).then((res, err) => {
      if( err) return;
      
    });
  }

  return (
    <Form onSubmit={(event) => { handleSubmit(event) }}>
      <Form.Group controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" />
      </Form.Group>
      <Form.Group controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <SubmitButton
        className="ml-auto"
        variant="secondary"
        type="submit"
        text="Submit" />
    </Form>
  );
}

export default SigninForm;