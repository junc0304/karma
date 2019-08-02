import React, { memo, useState, Fragment, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import _ from 'lodash';

const CustomInput = memo(({ edit = true, validation = (v) => null, onChange, defaultValue, reset, password, ...props }) => {
  const [input, setInput] = useState({ [props.name]: ['', ''] });
  const formStyle = props.style || ({ backgroundColor: "white", borderRadius: "5px" });

  useEffect(() => {
    if (defaultValue)
      setInput({ ...input, [props.name]: [defaultValue, input[props.name][1]] });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const debouncedOnChange = _.debounce((name, value, valid) => onChange(name, value, valid), 200);
  const handleChange = (event) => {
    let { name, value } = event.target;
    let validated = !password
      ? validation(name, value)
      : validation(password, value);
    setInput({ ...input, [name]: [value, validated] });
    debouncedOnChange(name, value, validated == null);
  }
  return (
    <Fragment>
      <Form.Control
        {...props}
        onChange={handleChange}
        value={input[props.name][0]}
        readOnly={!edit}
        disabled={!edit}
        style={formStyle}
        isInvalid={props.isInvalid || input[props.name][1]}
      >
        {props.children}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {input[props.name][1]}
      </Form.Control.Feedback>
    </Fragment>
  );
});

export default CustomInput;