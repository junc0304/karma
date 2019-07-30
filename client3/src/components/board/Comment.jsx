import React, { memo, useState, useEffect, Fragment } from 'react';
import { Form, Col, Row, Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RefreshIcon, ListIcon, DateIcon, PersonIcon, SendIcon } from '../icons'
import { dateTime, isEmpty } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';

const Comment = memo(({ data }) => {
  let { content, authorName, created } = data;
  return (
    <div style={{ backgroundColor: "white", borderRadius: "5px" }}>
      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", wordWrap: "break-word", padding: "0px 15px", marginTop: "5px" }}>
        {content}
      </div>
      <div className="d-flex" style={{ paddingRight: "5px", height: "25px" }}>
        <Form.Group className="d-flex ml-auto">
          <Form.Text style={{ marginRight: "10px" }} >
            <PersonIcon style={{ fontSize: "15px", verticalAlign: "middle" }} />
            {authorName}
          </Form.Text>
          <Form.Text style={{ marginRight: "10px" }} >
            <DateIcon style={{ fontSize: "14px", verticalAlign: "middle" }} />
            {dateTime.commentDate(created)}</Form.Text>
        </Form.Group>
      </div>
    </div>
  );
});


const CommentList = memo(({ data }) => {
  return (
    <div>
      {Object.values(data).map((item, index) => <Comment data={item} index={index} key={index} />)}
    </div>
  );
});


const CommentButton = memo(({ show, data, onShowHide, onRefresh }) => {
  return (
    <div className="d-flex" style={{ marginTop: "15px", textAlign: "center" }} >
      <label className="d-flex mr-auto">Comments{` [${data.length}]`}</label>
      <ButtonGroup className="d-flex ml-auto">
        <Button
          size="sm"
          variant="light"
          active={show}
          onClick={onShowHide}
        >
          <ListIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={onRefresh}
          style={{ display: "inline-block", verticalAlign: "middle", lineHeight: "normal" }}
        >
          <RefreshIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const CommentForm = memo(({ onChange, onSubmit }) => {
  return (
    <Form
      style={{ margin: "0px 15px 0px 15px", position: "float", marginTop: "10px" }}>
      <Row className="d-flex" as={Form.Group}>
        <InputGroup>
          <CustomInput
            name="content"
            as="textarea"
            rows={1}
            onChange={onChange}
            placeholder="Add Comment..."
            style={{ margin: "0px 0px 0px 0px", padding: "10px 0px 10px 10px", border: "0px", resize: "none", backgroundColor: "white", borderRadius: "5px  0px 0px 5px" }}
          />
          <InputGroup.Append>
            <Button
              size="sm"
              variant="light"
              onClick={onSubmit}
              style={{ width: "3.5rem" }}
            >
              <SendIcon style={{ fontSize: "20px", verticalAlign: "middle" }} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Form>
  );
});

const CommentComponent = memo(({ edit, postId, data, show, onChange, onSubmit, onShowHide, onRefresh }) => {

  //const [show, setShow] = useState(false);
  const hasComments = !isEmpty(data);

  //const handleChange = (name, value, validated) => formData[name] = value;
  //const handleSubmit = async () => await [createComment(formData), await getComments({ postId })];
  //const handleShowHide = () => setShow(!show);
  //const handleRefresh = async () => await getComments({ postId });

  return (
    <Fragment>
      {hasComments && (
        <CommentButton
          data={data}
          show={show}
          onShowHide={onShowHide}
          onRefresh={onRefresh}
        />
      )}
      {hasComments && show && (
        <CommentList data={data} />
      )}
      {!edit && (
        <CommentForm
          postId={postId}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      )}
    </Fragment>
  );
});


const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.comment.data,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(CommentComponent, CommentForm);