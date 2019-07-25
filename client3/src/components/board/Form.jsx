import React, { memo, useState, useRef } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import _ from 'lodash';

import { InvisibleIcon, VisibleIcon, RefreshIcon } from '../icons'
import * as actions from '../../actions';

const FormComponent = memo(({ getPosts, createPost, show, onClose, type }) => {

  const [formData, setFormData] = useState({ type: type });
  const title = useRef();
  const content = useRef();

  const setFormDataDebounced = _.debounce((name, value) => setFormData({ ...formData, [name]: value }), 300);
  const handleChange = (event) => setFormDataDebounced(event.target.name, event.target.value);
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createPost(formData);
    await getPosts(type);
  };

  const onFocusTitle = () => {
    title.current.focus();
  }
  const onFocusContent = () => {
    content.current.focus();
  }

  return (
    <Modal
      show={show}
      onHide={onClose} >
      <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
        <Form onSubmit={handleSubmit} >
          <Modal.Header style={{ borderRadius: "5px", padding: "5px 0px 16px 15px" }}>
            <h3>{type}</h3>
          </Modal.Header>
          <Modal.Body
            onClick={onFocusTitle}
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <Form.Label style={{ display: "flex", alignItems: "center" }} >
              Title:
          </Form.Label>
            <Form.Control
              className="lead input-lg"
              type="text"
              name="title"
              ref={title}
              onChange={handleChange}
              style={{ border: "0px solid #900" }}
            />
          </Modal.Body>
          <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginTop: "10px" }} onClick={onFocusContent}>
            <Form.Label style={{ display: "flex", alignItems: "center" }} >
              Content:
            </Form.Label>
            <Form.Control
              as="textarea"
              name="content"
              rows={10}
              onChange={handleChange}
              ref={content}
              style={{ padding: "16px", resize: "none", whiteSpace: "preWrap", backgroundColor: "white", borderRadius: "5px", minHeight: "300px", border: "0px solid #900" }}
            />
          </Modal.Body>
          <FormButtons onClose={onClose} />
        </Form>
      </Jumbotron>

    </Modal>
  );
});

const FormButtons = memo(({ onClose }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
        <Button
          type="submit"
          variant="light"
          onClick={onClose}
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


//export default EditForm;