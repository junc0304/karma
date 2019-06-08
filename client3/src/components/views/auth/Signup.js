import React, { useState, useEffect } from 'react';
import { Jumbotron, Form, Button } from 'react-bootstrap';

const SubmitButton = ({ className, variant, type, text }) => {
  return (
    <Button className={className} variant={variant} type={type} >
      {text}
    </Button>
  );
}

const SignupForm = () => {

  useEffect(() => {

  });

  return (
    <Form>
      <Form.Group controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
        <Form.Label>Password Confirm</Form.Label>
        <Form.Control type="password" placeholder="Confirm your Password" />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="formChecbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <SubmitButton
        className="ml-auto"
        variant="primary"
        type="submit"
        text="Submit" />
    </Form>
  );
}

export default SignupForm;