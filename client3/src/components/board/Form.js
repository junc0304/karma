import React, { memo } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const FormComponent = memo(({getPosts, createPost, show, setShow, type }) => {

  const onClickCreate = async (event) => {
    event.preventDefault();
    let { title, content, password} = event.target;
    let formData = {
      type: type,
      title: title.value,
      content: content.value,
      password: password.value
    }
    await createPost(formData);
    await getPosts(type);
  }

  return (
    <Modal
      centered
      size="xl"
      show={show}
      onHide={() => setShow(false)} >

        <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
          <h1 className="display-4">
            Create New</h1>
          <hr className="my-6" />
          <Form onSubmit={onClickCreate} >
            <Form.Label>
              Title</Form.Label>
            <Form.Control
              className="lead input-lg"
              as="input"
              type="text"
              name="title" />
            <Form.Label>
              Content</Form.Label>
            <Form.Control
              as="textarea"
              type="textarea"
              name="content"
              rows={10}
              style={{ resize: "none", whiteSpace: "preWrap" }} />
            <Form.Group>
            <Form.Label>
              Password</Form.Label>              
            <Form.Control
              className="ml-auto"
              type="password"
              name="password" />
            </Form.Group>
            <hr className="my-3" />
            <FormButtons 
                setShow={setShow} />
          </Form>
        </Jumbotron>
     {/*  </Modal.Body> */}
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
          onClick={() => setShow(false)}
          style={{ hight: "1rem",width: "5rem", marginRight: "5px" }} >
          Create</Button>
        <Button
          variant="light"
          style={{ width: "5rem" }}
          onClick={() => setShow(false)}>
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}
export default connect(mapStateToProps, actions)(FormComponent);


//export default EditForm;