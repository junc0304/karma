import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';

const CustomInput = ({input: {value, onChange}, name, id, placeholder, type}) => {
  return (
    <FormGroup>
        <FormControl
            name= {name}
            id= {id}
            placeholder={placeholder}
            type= {type}
            value={value}
            onChange={onChange} />
    </FormGroup>
  )
}
export default CustomInput;