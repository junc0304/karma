import React, { memo, useState, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

function CustomInput (props){
  const [input, setInput] = useState({[props.name]: [ '', '']});

  const formStyle = props.style || ({
      backgroundColor: "white",
      borderRadius: "5px"
    });

  const handleChange = (event) => {
    let { name, value } = event.target;
    let valid = props.validation(value);
    setInput({ ...input, [name]: [value, valid] });
    props.onChange(name, value, valid == null);
  }

  return (
    <Fragment>
      <Form.Control
        {...props}
        onChange={handleChange}
        value={input[props.name][0]}
        readOnly={props.edit}
        disabled={props.edit}
        style={formStyle}
        isInvalid={input[props.name][1]}
      >
        {props.children}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {input[props.name][1]}
      </Form.Control.Feedback>
    </Fragment>
  )
}

export default memo(CustomInput);