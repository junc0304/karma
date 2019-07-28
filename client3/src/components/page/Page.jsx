import React, { memo, useState, useEffect } from 'react';
import { Form, Button, ButtonGroup, Jumbotron } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CustomInput from '../shared/CustomInput';
import * as actions from '../../actions';
import RichTextEditor from './RichText.jsx';
import { JUMBOTRON_BG_COMMON } from '../../config';
import { EditIcon } from '../icons';
import { isUserAdmin, convertText } from '../../helpers';

const Page = memo((props) => {

  let { type, getPage } = props;
  let formData = { type };
  const [edit, setEdit] = useState(false);

  useEffect(() => { 
    (async () => await getPage(type))(); 
  }, [type]);

  const PageView = ({ getPage, updatePage, createPage, type, data }) => {
    let { title, content } = data;

    useEffect(() => { 
      formData = { ...formData, title, content }; 
    }, [data]);

    const handleSubmit = async (event) => {
      event.preventDefault();
      (title || content)
        ? await updatePage({ ...formData, type })
        : await createPage({ ...formData, type });
      await getPage(type);
      setEdit(false)
    }

    const handleTitleChange = (name, value, valid) => formData[name] = value;
    const handleContentChange = (value) => formData.content = convertText.toRaw(value);
    const handleEditModeChange = () => setEdit(!edit);
    const handleEditModeEnd = () => setEdit(false);

    return (
      <Jumbotron fluid style={{ wordWrap: "break-word", padding: "15px 15px", backgroundColor: JUMBOTRON_BG_COMMON }}>
        <Form onSubmit={handleSubmit}>
          <h1 className="display-4">
            <CustomInput
              name="title"
              type="text"
              size="lg"
              defaultValue={data.title}
              edit={edit}
              onChange={handleTitleChange}
              style={{ fontSize: "inherit", verticalAlign: "middle", border: edit ? "1px solid #ddd" : "0px solid #ddd", backgroundColor: edit ? "rgba(255, 255, 255, 0.8)" : "inherit" }}
            />
            {<EditButton onClick={handleEditModeChange} />}
          </h1>
          <hr className="my-4" />
          <RichTextEditor
            edit={edit}
            defaultValue={convertText.toEditorState(data.content)}
            onChange={handleContentChange}
          />
          {edit && <SaveCancelButton onClick={handleEditModeEnd} />}
        </Form>
      </Jumbotron>
    );
  }
  return <PageView {...props} />
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
  const handleCancelEdit = () => onClick();
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
          onClick={handleCancelEdit} >
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.auth.user,
    data: state.page.data,
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