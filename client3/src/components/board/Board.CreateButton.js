import React, { memo } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const CreateButton = memo(
  ({ setShow }) => {
    return (
      <div style={{ position: "relative" }}>
        <ButtonGroup
          style={{ 
            position: "absolute", right: "1px", bottom: "0px", 
            minHeight: "35px", minWidth: "35px" }}>
          <Button
            variant="light"
            onClick={()=>setShow(true)}>
            +</Button>
        </ButtonGroup>
      </div>
    );
  });

export default CreateButton;