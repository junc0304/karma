import React, { memo, useState, Fragment, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

const CustomInput = ({edit = true, validation = (v) => null, onChange, defaultValue, password ,...props }) => {
  const [input, setInput] = useState({[props.name]: ['', '']});
  const formStyle = props.style || ({ backgroundColor: "white", borderRadius: "5px" });

  const debouncedOnChange = _.debounce((name, value, valid) => onChange(name, value, valid) , 200);
  const handleChange = (event) => {
    let { name, value } = event.target;
    let validated = !password 
                      ? validation(name, value)
                      : validation(password, value);
    setInput({ ...input, [name]: [value, validated] });
    debouncedOnChange(name, value, validated == null );
  }

  useEffect(()=> {
    console.log(defaultValue);
    if(defaultValue) setInput({ ...input, [props.name]: [defaultValue, input[props.name][1]]})
    console.log(defaultValue);
  }, [])

  return (
    <Fragment>
      <Form.Control
        onChange={handleChange}
        value={input[props.name][0]}
        readOnly={!edit}
        disabled={!edit}
        style={formStyle}
        isInvalid={props.isInvalid || input[props.name][1]}
        {...props}
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