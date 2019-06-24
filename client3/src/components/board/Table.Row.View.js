import React, { memo, useState, useEffect, Fragment } from 'react';
import { Form, Modal, Jumbotron, Col, Row, ButtonGroup,  Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import Comment from './Comment';
import * as actions from '../../actions'

//single row view component
const TableRowView = memo(({ getPosts, comment, updatePost, deletePost, getComments, data, show, setShow, type }) => {
  const [editMode, setEditMode] = useState(false);
 /*  useEffect(() => {
    const fetchComments = async () => {
      await getComments({ postId: data.postId });
    };
    fetchComments();
  }, [getComments, data.postId]); */

  const onClickEdit = () => {
    setEditMode(true);
  }
  const closeModal = () => {
    setEditMode(false);
    setShow(false);
  }
  const onClickCancel = () => {
    setEditMode(false);
  }
  const onClickSave = async (event) => {
    event.preventDefault();
    let { type, postId } = data;
    let { title, content } = event.target;
    let formData = { type, postId, title: title.value, content: content.value };
    await updatePost(formData);
    await getPosts(type);
    setEditMode(false);
    setShow(false);
  }
  const onClickDelete = async () => {
    let { type, postId } = data;
    await deletePost({ postId });
    await getPosts(type);
    setEditMode(false);
    setShow(false);
  }
  return (
    <Modal
      show={show}
      onHide={closeModal} >
      <Jumbotron style={{ padding: "15px 15px", margin: "0" }}>
        <Form
          onSubmit={onClickSave}>
          <Modal.Header style={{ borderRadius: "5px", paddingRight: "0px" }}>
            <h3>{data.type}</h3>
            <MenuButton
              setClose={closeModal}
              editMode={editMode}
              onEdit={onClickEdit}
              onDelete={onClickDelete} />
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px" }}>
            <Title
              data={data}
              editMode={editMode} />
          </Modal.Body>
          <Modal.Body style={{ padding: "0px" }}>
            <Content
              data={data}
              editMode={editMode} />
          </Modal.Body>
          {editMode &&
            <SubmitButton onCancel={onClickCancel} />}
        </Form>
        <Comment onEdit={editMode} data={data} />
      </Jumbotron>
    </Modal>
  );
});

const MenuButton = memo(({ isAdmin = true, setClose, editMode, onEdit, onDelete }) => {
  return (
    <div>
      <ButtonGroup className="ml-auto">
        {editMode &&
          <Button
            variant="danger"
            onClick={onDelete}
            style={{ marginRight: "5px" }} >
            Delete</Button>}
        {isAdmin &&
          <Button
            variant="light"
            active={editMode}
            onClick={onEdit}
            style={{ marginRight: "5px" }} >
            Edit</Button>}
        <Button
          variant="light"
          onClick={setClose}>
          {"x"}</Button>
      </ButtonGroup>
    </div>
  );
});

const Title =({ onChange, editMode, data: { title, created, updated, authorName } }) => {
  const formatTime = (time) => {
    return new Intl.DateTimeFormat('en-US', {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(new Date(time));
  }
  return (
    <Fragment>
      <Row className="d-flex">
        <Form.Label column className="col-2" style={{display:"flex" ,alignItems: "center" }} >
          Title: </Form.Label >
        <Col className="col-10" style={{ paddingLeft:"0px"}}>
          <Form.Control
            className="form-control-lg"
            name="title"
            disabled={!editMode}
            defaultValue={title}
            style={{ verticalAlign:"middle", backgroundColor: "white", borderColor: editMode ? "pink" : "white" }} />
        </Col>
      </Row>
      <Row className="d-flex">
        <Col className="col-4">
          <Form.Text>Created {": " /*  formatTime(created) */}</Form.Text>
        </Col>
        <Col className="col-4">
          <Form.Text>Updated {": "  /* formatTime(updated || created.toString()) */}</Form.Text>
        </Col>
        <Col className="d-flex col-4">
          <Form.Text className=" ml-auto col-5">
            {"by:"}</Form.Text>
          <Col className="col-7">
            {authorName}
          </Col>
        </Col>
      </Row>
    </Fragment>
  );
}

const Content = ({ onChange, data: { content }, editMode }) => {
  return (
    <Form.Control
      name="content"
      as="textarea"
      rows={10}
      onChange={onChange}
      disabled={!editMode}
      defaultValue={content}
      style={{
        padding: "16px", marginTop: "10px", resize: "none", whiteSpace: "preWrap",
        backgroundColor: "white", borderRadius: "5px", minHeight: "300px", borderColor: editMode ? "pink" : "white"
      }} />
  );
}

const SubmitButton = memo(({ onSubmit, onCancel }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
        <Button
          type="submit"
          variant="light"
          onClick={onSubmit}
          style={{ hight: "1rem", width: "5rem", marginRight: "5px" }} >
          Save</Button>
        <Button
          variant="light"
          style={{ width: "5rem" }}
          onClick={onCancel}>
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  console.log(state);
  return {
    post: state.post,
    comment: state.comment,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(TableRowView);
