import React, { memo } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const FormComponent = memo(({ type, getPage, createPage, updatePage, data, show, setShow, onSubmit }) => {
 
  const dataExist = (data) => data? true: false;

  const formHeader = () => {
    if(data) return "Edit: "
    return "Create: "
  }
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    let { title, content} = event.target;
    let formData = {
      type: type,
      title: title.value,
      content: content.value
    }
    if (dataExist(data)) {
      await updatePage(formData); 
    } else {
      await createPage(formData);
    }
    await getPage(type);
    setShow(false);
  }

  return (
    <Modal
      centered
      show={show}
      onHide={() => setShow(false)} >
      <Modal.Header>
        {formHeader()}
        {data.title}</Modal.Header>
      <Modal.Body>
        <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="display-4">
              {data.title}</Form.Label>
              <Form.Control
                className="lead input-lg"
                name="title"
                defaultValue={data.title} />
              <hr className="my-4" />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Content</Form.Label>
              <Form.Control
                as="textarea"
                type="textarea"
                name="content"
                rows={10}
                defaultValue={data.content}
                style={{ resize: "none", whiteSpace: "preWrap" }} />
            </Form.Group>
            <ButtonComponent 
              setShow={setShow} />
          </Form>
        </Jumbotron>
      </Modal.Body>
    </Modal>
  );
});

const ButtonComponent = memo(({ setShow }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto">
        <Button
          type="submit"
          variant="light"
          onClick={() => setShow(false)}
          style={{ width: "5rem", marginRight: "5px" }} >
          Save</Button>
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
    page: state.page,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(FormComponent);


//export default EditForm;