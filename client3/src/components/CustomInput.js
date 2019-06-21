import React, {memo} from 'react';
import { Form } from 'react-bootstrap';

const CustomInput = memo(({ input: { value, onChange }, title, name, id, placeholder, defaultValue, rows, type, as, style, disabled }) => {
  return (
    <Form.Group>
      <Form.Label >
        {title}</Form.Label>
      <Form.Control
        as={as}
        name={name}
        id={id}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        rows={rows}
        defaultValue={defaultValue}
        style={style} />
    </Form.Group>
  );
});
export default CustomInput;