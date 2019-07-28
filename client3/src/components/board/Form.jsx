import React, { memo, useState, useRef } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import CustomInput from '../shared/CustomInput';
import _ from 'lodash';

import { InvisibleIcon, VisibleIcon, RefreshIcon } from '../icons'
import * as actions from '../../actions';

const FormComponent = memo(props => {

  let formData = { type: props.type, title: '', content: '' };

  const ViewComponent = ({ getPosts, createPost, show, onClose, type }) => {
    const handleChange = (name, value, validated) => {
      formData[name] = value;
      console.log(formData);
    }
    const handleSubmit = async (event) => {
      event.preventDefault();
      await createPost(formData);
      onClose();
      await getPosts(type);
    };
    return (
      <Modal
        show={show}
        onHide={onClose}
      >
        <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
          <Form onSubmit={handleSubmit} >
            <Modal.Header style={{ borderRadius: "5px", padding: "5px 0px 16px 15px" }}>
              <h3>{type}</h3>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px" }}>
              <Form.Label style={{ display: "flex", alignItems: "center" }} >
                Title:
            </Form.Label>
              <CustomInput
                required
                name="title"
                type="text"
                onChange={handleChange}
              />
            </Modal.Body>
            <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginTop: "10px" }} >
              <Form.Label style={{ display: "flex", alignItems: "center" }} >
                Content:
              </Form.Label>
              <CustomInput
                name='content'
                as='textarea'
                type='text'
                rows={10}
                onChange={handleChange}
                style={{ padding: "16px", resize: "none", whiteSpace: "preWrap", backgroundColor: "white", borderRadius: "5px", minHeight: "300px", border: "0px solid #900" }}
              />
            </Modal.Body>
            <FormButtons onClose={onClose} />
          </Form>
        </Jumbotron>
      </Modal>
    );
  }

  return <ViewComponent {...props} />
});

const FormButtons = memo(({ onClose }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
        <Button
          type="submit"
          variant="light"
          style={{ hight: "1rem", width: "5rem", marginRight: "5px" }}
        >
          Create
        </Button>
        <Button
          variant="light"
          onClick={onClose}
          style={{ width: "5rem" }}
        >
          Cancel
        </Button>
      </ButtonGroup>
    </Form.Group>
  );
});

function mapStateToProps(state) {
  return {
    type: state.post.type,
    errorMessage: state.auth.errorMessage
  }
}
export default connect(mapStateToProps, actions)(FormComponent);
