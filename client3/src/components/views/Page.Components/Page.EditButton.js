import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

const EditButton = memo(({setShow}) => {
  return(
    <div style={{position:"relative"}}>
      <Button 
        className="ml-auto" 
        variant="light" 
        onClick={()=> setShow(true)}
        style={{position:"absolute",right:"0px", top:"0px"}}>Edit</Button>
    </div>
    );
});

export default EditButton;