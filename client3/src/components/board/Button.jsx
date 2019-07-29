import React from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';
import { PlusIcon } from '../icons';

export const CreateButton = ({ show, onClick }) => {
  return (
    <div style={{ position: "relative" }}>
      {show && (
        <ButtonGroup style={{ position: "absolute", right: "1px", bottom: "0px", minHeight: "30px", minWidth: "30px" }} >
          <Button
            size="sm"
            fontSize="large"
            variant="light"
            onClick={onClick}
            style={{ backgroundColor: "rgba(255,255,255,0)", border: "0px" }}
          >
            <PlusIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        </ButtonGroup>
      )}
    </div>
  );
}

