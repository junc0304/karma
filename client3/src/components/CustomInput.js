import React, { memo, useState, Fragment } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

const CustomInput = ({edit = true, validation = (v) => null, onChange, style, name, children}) => {
  const [input, setInput] = useState({[name]: [ '', '']});

  const formStyle = style || ({
      backgroundColor: "white",
      borderRadius: "5px"
    });

  const handleChange = (event) => {
    let { name, value } = event.target;
    let valid = validation(value);
    setInput({ ...input, [name]: [value, valid] });
    onChange(name, value, valid == null);
  }

  return (
    <Fragment>
      <Form.Control
 
        onChange={handleChange}
        value={input[name][0]}
        readOnly={!edit}
        disabled={!edit}
        style={formStyle}
        isInvalid={input[name][1]}
      >
        {children}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {input[name][1]}
      </Form.Control.Feedback>
    </Fragment>
  )
}

export default memo(CustomInput);