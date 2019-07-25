import React, { memo, useState, useEffect, Fragment } from 'react';
import {  Button } from 'react-bootstrap';
import _ from 'lodash';

const CustomButton = ({ valid=false ,...props }) => {
  const [disabled, setDisabled] = useState(true);
  console.log(valid)
  useEffect(()=> {
    console.log(valid)
    setDisabled(!valid);
  }, [valid])

  return (
    <Fragment>
      <Button
        className="d-flex ml-auto"
        type="submit"
        variant="light"
        disabled={disabled}
       >
        {props.children}
      </Button>
    </Fragment>
  )
}

export default memo(CustomButton);