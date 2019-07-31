'use strict';
import React, { memo, useState, useEffect, Fragment } from 'react';
import { Jumbotron, Modal, Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { DeleteIcon, EditIcon, CancelIcon } from '../icons';
import { isEmpty, dateTime } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import CommentComponent from './Comment';
import * as actions from '../../actions';

const BoardForm = memo(({
  // from parent
  data, type, show, onClose, editable = false,
  // from store
  getPosts, createPost, updatePost, deletePost,
  comment, getComments, createComment
}) => {

  const [edit, setEdit] = useState(false);
  let { postId, title, content, created, updated, authorName, comments } = data;
  let postForm = {};
  let commentForm = {};

  const hasData = !isEmpty(data);
  const updating = edit && !isEmpty(data);
  const creating = edit && isEmpty(data);
  const viewing = !edit;

  useEffect(() => setEdit(isEmpty(data)), [data]);

  const handleChangeEdit = () => setEdit(!edit);

  const handleChangePost = (name, value, validated) => postForm[name] = value;
  const handleCreatePost = async () => [await createPost({ ...postForm, type }), await getPosts(type)];
  const handleUpdatePost = async () => [await updatePost({ ...postForm, postId }), await getPosts(type)];
  const handlePostDelete = async () => [await deletePost({ ...postForm, postId }), await getPosts(type)];

  const handleChangeComment = (name, value, validated) => commentForm[name] = value;
  const handleCreateComment = async () => [await createComment({ ...commentForm, postId }), await getComments({postId})];
  const handleRefreshComment = async () => await getComments({postId});

  return (
    <Modal
      show={show}
      onHide={onClose} >
      <Jumbotron style={{ padding: "15px 15px", margin: "0" }}>
        <MenuButtons
          onEditChange={handleChangeEdit}
          onUpdate={handleUpdatePost}
          onDelete={handlePostDelete}
          onClose={onClose}
        />
        <PostForm
          data={data}
          type={type}
          edit={edit}
          onChange={handleChangePost}
        />
        { updating || viewing  && (
          <FormButtons
            edit={edit}
            dataExist={!isEmpty(data)}
            onUpdate={handleUpdatePost}
            onCreate={handleCreatePost}
            onClose={onClose}
          />
        )}
        { viewing && (
          /* {data, postId, onChange, onCreate, onRefresh } */
          <CommentComponent
            edit={isEmpty(data)}
            onShowHide={handleChangeEdit}
            onCreate={handleCreateComment}
            onChange={handleChangeComment}
            onRefresh={handleRefreshComment}
          />
        )}
      </Jumbotron>
    </Modal>
  )
});


const PostForm = ({ data, edit, type, onChange }) => {

  let { postId, title, content, authorName, created } = data;
  let dataExist = isEmpty(data);

  return (
    <Form noValidate>
      <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px" }}>
        <Row>
          <Form.Label className="col-2" column style={{ display: "flex", alignItems: "center" }} >
            Title:</Form.Label >
          <Col className="col-10" style={{ paddingLeft: "0px" }}>
            <CustomInput
              size="lg"
              name="title"
              type="text"
              placeholder="Title"
              defaultValue={title}
              edit={edit}
              onChange={onChange}
              style={{ verticalAlign: "middle", backgroundColor: "white", border: `2px solid ${edit && dataExist ? "pink" : "white"}` }}
            />
          </Col>
        </Row>
        {!edit && (
          <Row>
            <Col className="col-7">
              <Form.Text>{`Created: ${dateTime.boardDate(created)}`}</Form.Text>
              {/* <Form.Text>{`Updated: ${dateTime.boardDate(data.updated || data.created.toString())}`}</Form.Text> */}
            </Col>
            <Col className="d-flex col-5">
              <Form.Text className=" ml-auto col-5">
                by:</Form.Text>
              <Col className="col-7 d-flex text-center">
                {authorName}
              </Col>
            </Col>
          </Row>
        )}
      </Modal.Body>
      <Modal.Body style={{ padding: "0px" }}>
        <CustomInput
          name="content"
          as="textarea"
          type="text"
          rows={10}
          defaultValue={content}
          edit={edit}
          placeholder="Content"
          onChange={onChange}
          style={{
            padding: "16px", marginTop: "10px", resize: "none", whiteSpace: "preWrap",
            backgroundColor: "white", borderRadius: "5px", minHeight: "300px", border: `2px solid ${edit && dataExist ? "pink" : "white"}`
          }}
        />
      </Modal.Body>
    </Form>
  );
}


const MenuButtons = memo(({ onClose, onDelete, onEditView, edit, show }) => {
  return (
    <div className="d-flex">
      <ButtonGroup className=" d-flex ml-auto">
        {edit && (
          <Button
            as={Button}
            size="sm"
            variant="danger"
            onClick={onDelete}
            style={{ marginRight: "2px", /* backgroundColor: "rgba(255,255,255,0)", border: "1.5px solid red"  */ }}
          >
            <DeleteIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        {show && (
          <Button
            size="sm"
            variant="light"
            active={edit}
            onClick={onEditView}
            style={{ textAlign: "center", verticalAlign: "middle", /* backgroundColor: "rgba(255,255,255,0)", border: "0px"  */ }}
          >
            <EditIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        <Button
          size="sm"
          variant="light"
          onClick={onClose}
          style={{ textAlign: "center", verticalAlign: "middle", /* backgroundColor: "rgba(255,255,255,0)", border: "0px"  */ }}
        >
          <CancelIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
      </ButtonGroup>

    </div>
  );
});

const FormButtons = memo(({ onUpdate, onCreate, onCancel, edit, data }) => {
  return (
    <Form.Group className="d-flex">
      {edit && (
        <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
          {!isEmpty(data) ? (
            <Button
              variant="light"
              onClick={onUpdate}
              style={{ hight: "1rem", width: "5rem", marginRight: "5px" }} >
              Update
          </Button>
          ) : (
              <Button
                variant="light"
                onClick={onCreate}
                style={{ hight: "1rem", width: "5rem", marginRight: "5px" }} >
                Create
            </Button>
            )}
          <Button
            variant="light"
            style={{ width: "5rem" }}
            onClick={onCancel}>
            Cancel</Button>
        </ButtonGroup>)}
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    comment: state.comment
    //data: state.post.data,
  };
}

export default connect(mapStateToProps, actions)(BoardForm);