import React, { memo, useState } from 'react';
import { Form, Button, Modal, Jumbotron } from 'react-bootstrap';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import * as actions from '../../actions';
import CustomInput from '../CustomInput';



const RowView = memo(({ handleSubmit, onSubmit, data, show, setShow }) => {

  const [editMode, setEditMode] = useState(false);
  const authorName = data.authorName? data.authorName : "Unknown";
  const isOwner = true;//data.authorId === user.userId;

  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(time));
  }

  const onClose = () => {
    setShow(false);
    setEditMode(false);
  }

  return (
    <Modal
      show={show}
      onHide={onClose}>
      <Jumbotron style={{ padding: "20px 20px", margin: "0" }}>
        <Modal.Body>
          <Form onSubmit={handleSubmit(onSubmit)} >
            <Field
              title="Title"
              name="title"
              disabled={!editMode}
              defaultValue={data.title}
              component={CustomInput}
              style={{ backgroundColor: !editMode ? "white" : null }} />
            <Form.Group className="d-flex" align="left">
                <Form.Label className="col-8">
                  {"Date: "}
                  { data.created}</Form.Label>
                <Form.Label className="col-4" >
                  {"Author: "}
                  { authorName}</Form.Label>
            </Form.Group>
            <Field
              title="Content"
              as="textarea"
              type="textarea"
              name="content"
              disabled={!editMode}
              defaultValue={data.content}
              rows={10}
              component={CustomInput}
              style={{ resize: "none", whiteSpace: "preWrap" , backgroundColor: !editMode ? "white" : null }} />
            <Form.Group className="d-flex" >
            </Form.Group>
            <hr className="my-3" />
            <Field
              title="Comment"
              as="textarea"
              disabled={editMode}
              defaultValue={data.comment}
              name="content"
              rows={3}
              component={CustomInput}
              style={{ resize: "none", whiteSpace: "preWrap", backgroundColor: "white", color: "black" }} />
          </Form>
        </Modal.Body>
      </Jumbotron>
    </Modal>
  )
});

const ButtonMenu = ({editMode, setEditMode}) => {
  return (
    <Button.Group>
      <Button onClick={()=> setEditMode(true)}>
        Edit</Button>
      { editMode &&
        <Button onClick={()=> setEditMode(false)}>
          Cancel</Button>}
    </Button.Group>
  );
}

const mapStateToProps = (state) => {
  return {

    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'board' })
)(RowView);
