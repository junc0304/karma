import React, { memo } from 'react';
import { ButtonGroup, Dropdown, DropdownButton, DropdownProps, Jumbotron } from 'react-bootstrap';

/* TODO: add button events && create new component  */
const BoardMenuButton = memo(
  ({ data, setData }) => {
    return (
      <div style={{ position: "relative" }}>
        <ButtonGroup
          style={{ 
            position: "absolute", right: "1px", bottom: "0px", 
            minHeight: "35px", minWidth: "35px" }}>
          <DropdownButton
            title={""}
            size="md"
            as={ButtonGroup}
            alignRight
            variant="light">
            <Dropdown.Item eventKey="1" >new</Dropdown.Item>
            <Dropdown.Item eventKey="2" >update</Dropdown.Item>
            <Dropdown.Item eventKey="3" >delete</Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </div>
    );
  });

export default BoardMenuButton;