import React, { memo, useState, useEffect, Fragment } from 'react';
import {  Button } from 'react-bootstrap';
import _ from 'lodash';

const CustomButton = ({ edit, ...props }) => {
  return (
    <Fragment>
      <Button
        className='d-flex ml-auto'
        type='submit'
        variant='light'
        disabled={!edit}
        {...props}
       >
        {props.children}
      </Button>
    </Fragment>
  )
}

export default memo(CustomButton);