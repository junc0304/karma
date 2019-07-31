'use strict';
import React, { memo, Fragment } from 'react';
import { Modal, Form, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { isEmpty, dateTime } from '../../helpers';
import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';
import { DeleteIcon, EditIcon, CancelIcon } from '../icons';

const PostComponent = ({
  data, edit, type, onChangeEdit, onClose,
  createPost, getPosts, updatePost, deletePost
}) => {

  let { postId, title, content, authorName, created } = data;
  let postForm = {};
  let dataExist = isEmpty(data);
  const updating = edit && !isEmpty(data);
  const creating = edit && isEmpty(data);
  const viewing = !edit;

  const handleChangePost = (name, value, validated) => postForm[name] = value;
  const handleCreatePost = async () => [await createPost({ ...postForm, type }), await getPosts(type)];
  const handleUpdatePost = async () => [await updatePost({ ...postForm, postId }), await getPosts(type)];
  const handlePostDelete = async () => [await deletePost({ ...postForm, postId }), await getPosts(type)];

  return (
    <Fragment>
      <Modal.Header style={{ borderRadius: "5px", padding: "5px 0px 16px 15px" }}>
        {viewing && <h3>View post</h3>}
        {updating && <h3>Update post</h3>}
        {creating && <h3>Create post</h3>}
        <MenuButtons
          onEditChange={onChangeEdit}
          onUpdate={handleUpdatePost}
          onDelete={handlePostDelete}
          edit={edit}
          show={(updating || viewing) && !creating}
          onClose={onClose}
        />
      </Modal.Header>

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
                onChange={handleChangePost}
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
            onChange={handleChangePost}
            style={{
              padding: "16px", marginTop: "10px", resize: "none", whiteSpace: "preWrap",
              backgroundColor: "white", borderRadius: "5px", minHeight: "300px", border: `2px solid ${edit && dataExist ? "pink" : "white"}`
            }}
          />
        </Modal.Body>
      </Form>
      {(updating || creating) && (
        <FormButtons
          edit={edit}
          noData={isEmpty(data)}
          onUpdate={handleUpdatePost}
          onCreate={handleCreatePost}
          onCancel={onChangeEdit}
        />
      )}
    </Fragment>
  );
}


const MenuButtons = memo(({ onClose, onDelete, onEditChange, edit, show }) => {
  return (
    <div className="d-flex">
      <ButtonGroup className=" d-flex ml-auto">
        {show && edit && (
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
            onClick={onEditChange}
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

const FormButtons = memo(({ onUpdate, onCreate, onCancel, edit, noData }) => {
  return (
    <Form.Group className="d-flex">
      {edit && (
        <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
          {!noData ? (
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
  };
}

export default connect(mapStateToProps, actions)(PostComponent);