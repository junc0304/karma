import React, { memo, useState, useEffect } from 'react';
import { Form, Modal, Jumbotron, Col, Row, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {isUserAdmin } from '../../helpers';
import Comment from './Comment.jsx';
import * as actions from '../../actions'
import {EditIcon, TrashIcon, ExIcon} from '../icons';
import {JUMBOTRON_BG_COMMON} from '../../config'
import './Board.css'
//single row view component
const TableRowView = memo(({ getPosts, updatePost, deletePost, getComments, data, show, onClose, type, user : {  role="ADMIN" , userId } }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentData, setCurrentData] = useState({});
  
  useEffect(()=> {
    setCurrentData(data);
  },[data])

  const onEdit = () => {
    setEditMode(!editMode);
  }
  const onCloseModal = () => {
    setEditMode(false);
    onClose();
  }
  const onClickCancel = () => {
    setEditMode(false);
  }

  const onClickSave = async (event) => {
    event.preventDefault();
    let { postId, type } = currentData;
    let formData = {
      postId: postId,
      title: event.target.title.value,
      content: event.target.content.value 
    };

    await updatePost(formData);
    await getPosts(type);
    setEditMode(false);
  }
  const onDelete = async () => {
    let { type, postId } = currentData;
    await deletePost({ postId });
    await getPosts(type);
    setEditMode(false);
  }

  const onClickShowComments = async () => {
    let { postId } = currentData;
    await getComments({postId});
  }

  return (
    <Modal
      show={show}
      onHide={onCloseModal} >
      <Jumbotron style={{ padding: "15px 15px", margin: "0"}}>
        <Form onSubmit={onClickSave}>
          <Modal.Header style={{ borderRadius: "5px", padding: "5px 0px 16px 15px"}}>
          <h3>{currentData.type}</h3>
            <MenuButton
              isAuth={(isUserAdmin(role) || userId === currentData.ownerId )}
              editMode={editMode}
              onClose={onCloseModal}
              onEdit={onEdit}
              onDelete={onDelete} />
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px" }}>
            <Title data={currentData} editMode={editMode} />
            <Details data={currentData} />
          </Modal.Body>
          <Modal.Body style={{ padding: "0px" }}>
            <Content
              data={currentData}
              editMode={editMode} />
          </Modal.Body>
          {editMode &&
            <FormButtons onCancel={onClickCancel} />}
        </Form>
        <Comment 
          data={currentData.comments}
          onShow={onClickShowComments}
          editMode={editMode} 
          postId={currentData.postId} />
      </Jumbotron>
    </Modal>
  );
});

const MenuButton = memo(({ isAuth = false, onClose, editMode, onEdit, onDelete }) => {
  return (
    <div>
      <ButtonGroup className="ml-auto">
        {isAuth && editMode &&
        <Button
          size="sm"
          variant="danger"
          onClick={onDelete}
          style={{ marginRight: "5px" }} >
          <TrashIcon style={{textAlign:"center", verticalAlign:"middle"}} /></Button>}
        {isAuth &&
        <Button
          size="sm"
          variant="light"
          active={editMode}
          onClick={onEdit} >
          <EditIcon style={{textAlign:"center", verticalAlign:"middle"}} /></Button>}
        <Button
        size="sm"
          variant="light"
          onClick={onClose}>
          <ExIcon style={{textAlign:"center", verticalAlign:"middle"}} /></Button>
      </ButtonGroup>
    </div>
  );
});

const Title = memo(({ editMode = false, data: { title="" } }) => {
  const [defaultTitle, setDefaultTitle] = useState('');

  useEffect(() => {
    setDefaultTitle(title);
  }, [title, editMode]);
  const handleChange = event => setDefaultTitle(event.target.value);

  return (
    <Row>
      <Form.Label className="col-2" column style={{ display: "flex", alignItems: "center" }} >
        Title:</Form.Label >
      <Col className="col-10" style={{ paddingLeft: "0px" }}>
        <Form.Control
          name="title"
          type="text"
          size="lg"
          disabled={!editMode}
          value={defaultTitle}
          onChange={handleChange}
          style={{ verticalAlign: "middle", backgroundColor: "white", borderColor: editMode ? "pink" : "white" }} />
      </Col>
    </Row>
  );
});

const Details = memo(({ data: { created = "", updated = "", authorName = "" } }) => {
  const formatTime = (time) => {
    let newDate = new Date(time);
    let hour = newDate.getHours();
    let min = newDate.getMinutes();
    let show = new Date().getDate() - newDate.getDate() < 1 ;
    return `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}${show?  `-${hour<10?`0${hour}`:hour}:${min<10?`0${min}`:min}`: ``}`
  }
  return (
    <Row>
      <Col className="col-7">
        <Form.Text>{`Created: ${formatTime(created)}`}</Form.Text>
        <Form.Text>{`Updated: ${formatTime(updated || created.toString())}`}</Form.Text>
      </Col>
      <Col className="d-flex col-5">
        <Form.Text className=" ml-auto col-5">
          by:</Form.Text>
        <Col className="col-7 d-flex text-center">
          {authorName}
        </Col>
      </Col>
    </Row>
  )
});

const Content = ({ data: { content }, editMode }) => {
  const [defaultContent, setDefaultContent] = useState('');
  useEffect(() => {
    setDefaultContent(content);
  }, [content, editMode]);
  const handleChange = event => {
    setDefaultContent(event.target.value);
  }
  return (
    <Form.Control
      name="content"
      as="textarea"
      rows={10}
      disabled={!editMode}
      onChange={handleChange}
      value={defaultContent}
      style={{
        padding: "16px", marginTop: "10px", resize: "none", whiteSpace: "preWrap",
        backgroundColor: "white", borderRadius: "5px", minHeight: "300px", borderColor: editMode ? "pink" : "white"
      }} />
  );
}

const FormButtons = memo(({ onSubmit, onCancel }) => {
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
    user: state.auth.user,
    comment: state.comment,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(TableRowView);
