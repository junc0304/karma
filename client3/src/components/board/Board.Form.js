import React, { memo, useState } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';
import CustomInput from '../CustomInput';

const BoardForm = memo(({ handleSubmit, show, setShow, onSubmit }) => {

  return (
    <Modal
      centered
      size="xl"
      show={show}
      onHide={() => setShow(false)} >

{/*       <Modal.Body> */}
        <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
          <h1 className="display-4">
            Create New</h1>
          <hr className="my-6" />
          <Form onSubmit={handleSubmit(onSubmit)} >
            <Field
              title="Title"
              className="lead input-lg"
              name="title"
              component={CustomInput} />
            <Field
              title="Content"
              as="textarea"
              type="textarea"
              name="content"
              rows={10}
              component={CustomInput}
              style={{ resize: "none", whiteSpace: "preWrap" }} />
            <Form.Group className="d-flex" >
              <Field
                title="Password"
                className="ml-auto"
                type="password"
                name="password"
                component={CustomInput} />
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

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'board' })
)(BoardForm);


//export default EditForm;