import React, { memo, useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';

import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';
import RichTextEditor from './RichText.jsx';
import { JUMBOTRON_BG_COMMON } from '../../config';
import { EditIcon } from '../icons';
import './Page.css';
const Page = memo(({
  type, data, isAdmin,
  getPage, updatePage, createPage //action
}) => {
  let { title, content } = data;
  let formData = { title, content };
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    const fetchData = async () => await getPage(type);
    fetchData();
  }, []);
  const handleTitleChange = (name, value) => formData[name] = value;
  const handleContentChange = (value) => formData.content = value;
  const handleEditModeChange = () => setEdit(!edit);
  const handleEditModeEnd = () => setEdit(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    (title || content)
      ? await updatePage({ ...formData, type })
      : await createPage({ ...formData, type });
    await getPage(type);
    setEdit(false)
  }

  return (
    <Jumbotron className="jumbotron-main" style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: JUMBOTRON_BG_COMMON }}>
      <div className="jumbotron-inner-frame" >
        <Form onSubmit={handleSubmit}>
          <h1>
            <CustomInput
              name="title"
              type="text"
              size="lg"
              defaultValue={title}
              edit={edit}
              onChange={handleTitleChange}
              style={{ height:"5rem", fontSize: "3rem", color: "black", verticalAlign: "middle", border: edit ? "1px solid #ddd" : "0px solid #ddd", backgroundColor: edit ? "rgba(255, 255, 255, 0.8)" : "inherit" }}
            />
            {isAdmin && <EditButton onClick={handleEditModeChange} />}
          </h1>
          <hr className="my-2" />
          <RichTextEditor
            edit={edit}
            defaultValue={content}
            onChange={handleContentChange}
          />
          {edit && <SaveCancelButton onClick={handleEditModeEnd} />}
        </Form>
      </div>
    </Jumbotron>
  );


});

const EditButton = memo(({ onClick }) => {
  const handleModeChange = () => onClick();
  return (
    <div style={{ position: "relative" }}>
      <Button
        className="ml-auto"
        variant="light"
        size="sm"
        onClick={handleModeChange}
        style={{ position: "absolute", right: "0px", bottom: "0px" }}
      >
        <EditIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
      </Button>
    </div>
  );
});

const SaveCancelButton = memo(({ onClick }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
        <Button
          className="btn btn-main"
          type="submit"
          variant="light"
          style={{ width: "5rem", marginRight: "5px" }} >
          Save</Button>
        <Button
          className="btn btn-main"
          variant="light"
          style={{ width: "5rem" }}
          onClick={onClick} >
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    data: state.page.data,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Page);