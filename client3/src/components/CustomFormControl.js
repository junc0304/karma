import React, { memo, useState, useEffect, Fragment } from 'react';
import { Jumbotron, ButtonGroup, Button, Form } from 'react-bootstrap';
import _ from 'lodash';

const CustomInput = ({ edit = true, ...props }) => {
  const [form, setForm] = useState({});

  const formStyle = props.style || (
    { backgroundColor: "white",
      borderRadius: "5px",
      //border: !edit? "1px solid #ced4da" : "1px solid pink"
    });
  /* 
  const handleChange = (event) => setFormDataDebounced(event.target.name, event.target.value);
  const setFormDataDebounced = _.debounce( (name, value) => setForm({ ...form, [name]: value }) , 400);  
  */
  const handleChange = (event ) => {
    let { name, value} = event.target;
    setForm({ ...form, [name]: value });
  }

  return (
    <Fragment>
      <Form.Control
        {...props}
        onChange={handleChange}
        value = {form[props.name]}
        readOnly={!edit}
        disabled={!edit}
        style={formStyle}
      >
        {props.children}
      </Form.Control>
    {/*   { edit ? (
        <Form.Control
          {...props}
          onChange={handleChange}
          readOnly={!edit}
          disabled={!edit}
          style={formStyle}
        >
          {props.children}
        </Form.Control>
      ) : (
        <Form.Control
          {...props}
          onChange={handleChange}
          readOnly={!edit}
         // plaintext={!edit}
          disabled={!edit}
          style={formStyle}
        >
          {props.children}
        </Form.Control> */}
       {/*  <div style={formStyle}>
          {props.defaultValue}
        </div>  */}
      )}
    </Fragment>
  )
}

export default CustomInput;