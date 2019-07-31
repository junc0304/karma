import React, { memo, useState, useEffect, Fragment, useRef, createRef } from 'react';
import { Form, Col, Row, Button, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RefreshIcon, ListIcon, DateIcon, PersonIcon, SendIcon } from '../icons'
import { dateTime, isEmpty } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';
import _ from 'lodash';

const CommentComponent = memo((props) => {

  const [show, setShow] = useState(false);

  let { data, postId, createComment, getComments } = props;
  let commentForm = {};

  const handleShowHideComment = () => setShow(!show);
  const handleChangeComment = (name, value, validated) => commentForm[name] = value;
  const handleCreateComment = async () => [await createComment({ ...commentForm, postId }), await getComments({ postId })];
  const handleRefreshComment = async () => await getComments({ postId });

  return (
    <Fragment>
      {!isEmpty(data) && (
        <CommentControl
          data={data}
          show={show}
          onShowHide={handleShowHideComment}
          onRefresh={handleRefreshComment}
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
        onChange={handleChangeComment}
        onSubmit={handleCreateComment}
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

const CommentForm = memo(({ onChange, onSubmit }) => {
  const [formData, setFormData] = useState({ content: '' });

  const debouncedOnChange = _.debounce((name, value) => onChange(name, value), 200);
  const handleChange = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    debouncedOnChange(name, value, null);
  };

  return (
    <Form
      onReset={onSubmit}
      style={{ margin: "0px 15px 0px 15px", position: "float", marginTop: "10px" }}>
      <Row className="d-flex" as={Form.Group}>
        <InputGroup>
          <FormControl
            name="content"
            as="textarea"
            rows={1}
            onChange={handleChange}
            placeholder="Add Comment Here"
            style={{ margin: "0px 0px 0px 0px", padding: "10px 0px 10px 10px", border: "0px", resize: "none", backgroundColor: "white", borderRadius: "5px  0px 0px 5px" }}
          />
          <InputGroup.Append>
            <Button
              size="sm"
              type="reset"
              variant="light"
              style={{ width: "3.5rem" }}
              disabled={!formData.content.length}
            >
              <SendIcon style={{ fontSize: "20px", verticalAlign: "middle" }} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Row>
    </Form>
  );
});


const mapStateToProps = (state) => {
  console.log(state);
  return {
    data: state.comment.data,
    postId: state.comment.postId,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(CommentComponent, CommentForm);