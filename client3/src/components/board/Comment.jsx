import React, { memo, useState, useEffect, Fragment } from 'react';
import { Form, Col, Row, Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RefreshIcon, ListIcon, DateIcon, PersonIcon, SendIcon } from '../icons'
import { dateTime, isEmpty } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';

const CommentComponent = memo(({ data, postId, onChange, onCreate, onRefresh }) => {
  const [show, setShow] = useState(false);
  const handleShowHideComment = () => setShow(!show);
  const onCreateComment = () => [setShow(true), onCreate()]
  useEffect(() => console.log("showing", show, "data empty", isEmpty(data)));
  return (
    <Fragment>
      {!isEmpty(data) && (
        <CommentControl
          data={data}
          show={show}
          onShowHide={handleShowHideComment}
          onRefresh={onRefresh}
        />
      )}
      {!isEmpty(data) && (
        <CommentList
          data={data}
          show={show}
        />
      )}
      <CommentForm
        show={show}
        postId={postId}
        onChange={onChange}
        onSubmit={onCreateComment}
      />
    </Fragment>
  );
});

const Comment = memo(({ data, index }) => {
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


const CommentList = memo(({ data, show }) => {
  return (
    <div>
      {show && Object.values(data).map((item, index) => <Comment data={item} index={index} key={`comm-${index}`} />)}
    </div>
  );
});

const CommentControl = memo(({ show, data, onShowHide, onRefresh }) => {
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

const CommentForm = ({ onChange, onSubmit }) => {
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
            placeholder="Add Comment Here"
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
};


const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.comment.data,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(CommentComponent, CommentForm);