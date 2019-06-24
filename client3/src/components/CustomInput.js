import React, {memo} from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = memo((
  { input: { onChange, value }, style, name, id, placeholder, defaultValue, rows, type, as, disabled }) => {
  return (
    <Form.Group>
      <Form.Control
        as={as}
        name={name}
        id={id}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        disabled={disabled}
        rows={rows}
        style={{...style, backgroundColor:"white"}}
        defaultValue={defaultValue}/>
    </Form.Group>
  );
});
export default CustomInput;