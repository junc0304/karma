import React, { memo, useState, useEffect, Fragment } from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as actions from '../../actions'

const CommentComponent = ({ getComments, onEdit, postId, comment:{ data }, role = "ADMIN" }) => {

  useEffect(()=> {
    const fetchData = async () => 
      postId? await getComments({postId: postId}): null;
    fetchData();
  }, [postId]);
  
  useEffect(()=> {
    console.log(data);
  });
  return (
    <Fragment>
      <CommentList data={data} />
      { !onEdit &&
      <CommentForm data={data} /> }
    </Fragment>
  );
}

//content status authorId created updated
const Comment = ({ data: { content, authorName, created } }) => {
  return (
    <Form.Group>
      <Col className="col-8">
        <Form.Control
          type="text"
          name="comment"
          defaultValue={content} />
      </Col>
      <Col className="col-4">
        <Form.Control
          as={Row}
          type="text"
          name="user"
          defaultValue={authorName} />
        <Form.Control
          as={Row}
          type="text"
          name="date"
          defaultValue={created} />
      </Col>
    </Form.Group>
  );
}


const CommentList = ({ data }) => {
  return (
    <Form>
      <Form.Label>
        Comments</Form.Label>
      {data? data.map((item, index) =>
        <Comment data={item} key={index} />)
      : "no comments yet"}
    </Form>
  );
}

const CommentForm = memo(({ postComment, data: { postId } }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({ ...formData, postId });
    return (() => {
      setFormData({});
    })
  }, []);

  const onCommentSubmit = async (event) => {
    event.prevetnDefault();
    let formData = { postId, content: event.target.content }

    console.log(formData);
    await postComment(formData);
  }

  return (
    <Form onSubmit={onCommentSubmit}
      style={{ position: "sticky", marginTop: "10px" }}>
      <Row className="d-flex" as={Form.Group}>
        <Col
          as={Form.Control}
          className="col-9"
          name="content"
          as="textarea"
          type="textarea"
          rows={2}
          placeholder="Add Comment..."
          style={{ margin: "0px 5px 0px 15px", padding: "0px 0px 10px 10px", border: "0px", resize: "none", backgroundColor: "white", borderRadius: "5px" }} />
        <Col
          as={Button}
          size="sm"
          type="submit"
          className="col-2"
          variant="secondary" >
          Submit</Col>
      </Row>
    </Form>
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

export default connect(mapStateToProps, actions)(CommentComponent);