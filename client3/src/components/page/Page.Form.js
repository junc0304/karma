import React, { memo, useState } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';
import CustomInput from '../CustomInput';

const EditForm = memo(({ handleSubmit, data, show, setShow, onSubmit }) => {

  const formHeader = () => {
    if(data) return "Edit: "
    return "Create: "
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
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label className="display-4">
              {data.title}</Form.Label>
              <Field
                className="lead input-lg"
                name="title"
                defaultValue={data.title}
                component={CustomInput} />
              <hr className="my-4" />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Content</Form.Label>
              <Field
                as="textarea"
                type="textarea"
                name="content"
                rows={10}
                defaultValue={data.content}
                component={CustomInput}
                style={{ resize: "none", whiteSpace: "preWrap" }} />
            </Form.Group>
            <FormButtons 
              setShow={setShow} />
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
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'page' })
)(EditForm);


//export default EditForm;