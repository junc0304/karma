import React, { memo } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron, ButtonToolbar } from 'react-bootstrap';
import CustomInput from '../CustomInput';
import { Field } from 'redux-form';

const EditForm = memo(({setData, data, show, setShow}) => {

  const onSubmit = ({ heading, content }) => {
    console.log({ heading, content });
    setData({ heading, content });
  }

  return (
    <Modal
      centered
      show={show}
      onHide={()=> setShow(false)} >
      <Modal.Header>
        Edit: {data.title}</Modal.Header>
      <Modal.Body>
        <Jumbotron style={{padding:"20px",marginBottom:"0px"}} >
          <h1 className="display-4">
            {data.title}</h1>
          <hr className="my-4" />
          <Form onSubmit={(event) => onSubmit(event)}>
            <Form.Group>
              <Form.Label className="lead" >
                Heading</Form.Label>
              <Form.Control className="lead input-lg" name="heading" type="text" defaultValue={data.heading} />
              <Form.Label>
                Content</Form.Label>
              <textarea className="form-control" name="content" rows={10} defaultValue={data.content} style={{resize:"none"}}/>
            </Form.Group>
            <FormButtons setShow={setShow} />
          </Form>
        </Jumbotron>
      </Modal.Body>
    </Modal>
  );
});

const FormButtons = memo(({ setShow }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto">
        <Button 
          type="submit" 
          variant="light" 
          style={{ width: "5rem", marginRight: "5px" }}>
          Save</Button>
        <Button variant="light" style={{ width: "5rem" }} onClick={() => setShow(false)}>
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  )
});


export default EditForm;