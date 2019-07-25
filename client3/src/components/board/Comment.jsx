import React, { memo, useState, useEffect, Fragment } from 'react';
import { Form, Col, Row, Button, ButtonGroup, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import {InvisibleIcon, VisibleIcon, RefreshIcon, ListIcon, DateIcon, PersonIcon, Icon} from '../icons'
import _ from 'lodash';

import * as actions from '../../actions'

const CommentComponent = memo(({  edit, postId , comment:{ data }, getComments, createComment }) => {
  const [comments, setComments] = useState({data:{}, show:false});

  useEffect(() => { 
    const fetchComments = async () => await getComments({ postId });
    fetchComments(postId);
  }, [postId]);
  useEffect(() => setComments({...comments, data: data}), [data]);

  const handleSubmit = async (formData) => {
    await createComment(formData);
    handleRefresh();
  }
  const handleRefresh = async () => await getComments({ postId });
  const handleVisibility = () => setComments({...comments, show: !comments.show});

  const hasComments = (commentData) => commentData.length > 0;

  return (
    <Fragment>
      {hasComments(comments.data) && (
        <CommentsController 
          data={comments.data}
          show={comments.show} 
          onShowHide={handleVisibility} 
          onRefresh={handleRefresh} 
        />
      )}
      {hasComments(comments.data) && comments.show && (
        <CommentList data={comments.data} />
      )}
      {!edit && (
        <CommentForm postId={postId} onSubmit={handleSubmit} />
      )}
    </Fragment>
  );
});

const CommentsController = ({show, data, onShowHide, onRefresh }) => {
  return (
    <div className="d-flex" style={{marginTop:"15px", textAlign:"center" }} >
      <label className="d-flex mr-auto">Comments{` [${data.length}]`}</label>
      <ButtonGroup className="d-flex ml-auto">
        <Button
          size="sm"
          variant="light"
          active={show}
          onClick={onShowHide} 
        >
          <ListIcon style={{textAlign:"center", verticalAlign:"middle"}} />
        </Button>
        <Button
          size="sm"
          variant="light"
          onClick={onRefresh}
          style={{ display:"inline-block", verticalAlign:"middle", lineHeight:"normal"}}
        >
          <RefreshIcon style={{textAlign:"center", verticalAlign:"middle"}} />
        </Button>
      </ButtonGroup>
    </div>
  );
}

//content status authorId created updated
const CommentRow = memo( ({ data }) => {
  let { content, authorName, created }  = data;
  const formatDate = (date) => {
    let newDate = new Date();
    let min = newDate.getMinutes();
    let hour = newDate.getHours();
    let amPm = hour < 12? "am":"pm";
    return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()} | ${hour<10?`0${hour}`:hour}:${min<10?`0${min}`:min} ${amPm}`
  }
  return (
    <div style={{backgroundColor:"white", borderRadius:"5px"}}>
      <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-all", wordWrap:"break-word", padding:"0px 15px", marginTop:"5px" }}>
        {content}
      </div>
      <div className="d-flex" style={{paddingRight:"5px", height:"25px"}}>
        <Form.Group  className="d-flex ml-auto">
          <Form.Text style={{ marginRight:"10px" }} >
            <PersonIcon style={{fontSize: "15px", verticalAlign:"middle"}}/>
            {authorName}</Form.Text>
          <Form.Text style={{ marginRight:"10px" }} >
            <DateIcon style={{fontSize: "14px", verticalAlign:"middle"}} />
            {formatDate(created)}</Form.Text>
        </Form.Group>
      </div>
    </div>
  );
});

const CommentList = memo(({ data }) => {
  return (
    <div>
      { Object.values(data).map((item, index) =>
        <CommentRow data={item} index={index} key={index} />
      )}
    </div>
  );
});

const CommentForm = memo(({ onSubmit, postId }) => {

  const onCommentSubmit = async (event) => {
    event.preventDefault();
    let { content } = event.currentTarget;
    onSubmit({ postId, content: content.value});
    content.value = "";
  }

  return (
    <Form onSubmit={onCommentSubmit}
      style={{ margin: "0px 15px 0px 15px", position: "float", marginTop: "10px" }}>
      <Row className="d-flex" as={Form.Group}>
      <InputGroup>
        <Form.Control  
          name="content" 
          as="textarea" 
          rows={1} 
          placeholder="Add Comment..." 
          style={{ margin: "0px 0px 0px 0px", padding: "10px 0px 10px 10px", border: "0px", resize: "none", backgroundColor: "white", borderRadius: "5px  0px 0px 5px" }} />
        <InputGroup.Append>
        <Button
          size="sm"
          type="submit"
          variant="secondary"
          style={{width:"3.5rem"}}
        >
        Send
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
    user: state.auth.user,
    post: state.post,
    comment: state.comment,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(CommentComponent);