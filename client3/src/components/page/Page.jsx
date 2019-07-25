import React, { memo, useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import * as actions from '../../actions';
import RichTextEditor from './RichText.jsx';
import { JUMBOTRON_BG_COMMON } from '../../config';
import { EditIcon } from '../icons';
import { isUserAdmin } from '../../helpers';
import PropTypes from 'prop-types';


const Page = memo(({ getPage, updatePage, createPage, type, role, pageData: { title, content } }) => {

  const [editMode, setEditMode] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [formData, setFormData] = useState({ type, title, content });

  useEffect(() => {
    const fetchData = async () => await getPage(type);
    fetchData();
  }, [type, getPage]);

  useEffect(() => {
    setFormData({ title, content });
    setEditorState(getRichText(content));
  }, [type, title, content, editMode])

  //convert raw data to editor state item 
  const getRichText = (content) => {
    if (content) {
      return EditorState.createWithContent(convertFromRaw(JSON.parse(content)));
    }
    return EditorState.createEmpty();
  }

  //convert editor state item to raw data
  const formatContent = (editorState) => {
    let contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState))
  }

  const onChageTitle = (event) => {
    let { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }
  const onChangeEditorState = (editorState) => {
    setEditorState(editorState);
    setFormData({ ...formData, content: formatContent(editorState) });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (title && content)
      await updatePage({ ...formData, type });
    else
      await createPage({ ...formData, type });

    await getPage(type);
    setEditMode(false)
  }

  return (
    <Jumbotron fluid style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: JUMBOTRON_BG_COMMON }}>
      <Form onSubmit={handleSubmit}>
        <h1 className="display-4">
          <Form.Control
            name="title"
            type="text"
            size="lg"
            disabled={!editMode}
            value={formData.title || ''}
            onChange={onChageTitle}
            style={{ fontSize: "inherit", verticalAlign: "middle", border: editMode ? "1px solid #ddd" : "0px solid #ddd", backgroundColor: editMode ? "rgba(255, 255, 255, 0.8)" : "inherit" }} />
          {isUserAdmin(role) &&
            <EditButton editMode={editMode} setEditMode={setEditMode} />}
        </h1>
        <hr className="my-4" />
        <RichTextEditor
          editMode={editMode}
          editorState={editorState}
          onChangeEditorState={onChangeEditorState} />
        {editMode &&
          <ButtonComponent setEditMode={setEditMode} />}
      </Form>
    </Jumbotron>
  );
});

const EditButton = memo(({ editMode, setEditMode }) => {
  return (
    <div style={{ position: "relative" }}>
      <Button
        className="ml-auto"
        variant="light"
        size="sm"
        onClick={() => setEditMode(!editMode)}
        style={{ position: "absolute", right: "0px", bottom: "0px" }}><EditIcon style={{ textAlign: "center", verticalAlign: "middle" }} /></Button>
    </div>
  );
});

const ButtonComponent = memo(({ setEditMode }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
        <Button
          type="submit"
          variant="light"
          style={{ width: "5rem", marginRight: "5px" }} >
          Save</Button>
        <Button
          variant="light"
          style={{ width: "5rem" }}
          onClick={() => setEditMode(false)} >
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    pageData: state.page.data,
    errorMessage: state.errorMessage
  };
}

Page.propTypes = {
  getPage: PropTypes.func,
  updatePage: PropTypes.func,
  createPage: PropTypes.func,

  type: PropTypes.string,
  role: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string
};

Page.defaultProps = {
  type: "",
  role: "",
  data: { title: "", content: "" }
}


export default connect(mapStateToProps, actions)(Page);