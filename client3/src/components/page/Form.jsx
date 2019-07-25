import React, { memo,useState,useEffect } from 'react';
import { Form, Button, Modal, ButtonGroup, Jumbotron } from 'react-bootstrap';
import { connect } from 'react-redux';
import {EditorState, convertToRaw} from 'draft-js';
import * as actions from '../../actions';
import RichTextEditor from './RichText.jsx';
import {EditIcon, TrashIcon, CancelIcon} from '../icons';

const FormComponent = memo(({ type, getPage, createPage, updatePage, data, show, setShow,content, onSubmit, editMode }) => {
  const dataExist = (data) => data? true: false;
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  useEffect(() => {
    setEditorState(content)
  }, [data]);

  const formatContent = (editorState) => {
    let contentState = editorState.getCurrentContent();
    return JSON.stringify(convertToRaw(contentState))
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let { pageTitle} = event.target;
    let formData = {
      type: type,
      title: pageTitle.value,
      content: formatContent(editorState)
    }
    if (dataExist(data)) {
      await updatePage(formData); 
    } 
    else {
      await createPage(formData);
    }
    await getPage(type);
    setShow(false);
  }


  
  return (
   /*  <Modal
      centered
      show={show}
      onHide={() => setShow(false)} > */
      <div>
      <Modal.Header>
        {data.type}</Modal.Header>
      <Modal.Body>
        <Jumbotron style={{ padding: "20px", marginBottom: "0px" }} >
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className="display-4">
              {data.title}</Form.Label>
              <Form.Control
                className="lead input-lg"
                name="pageTitle"
                //onChange={handleChange}
                defaultValue={data.title} />
              <hr className="my-4" />
            </Form.Group>
            <Form.Group>
              <RichTextEditor 
                editMode={editMode} 
                editorState={editorState} 
                setEditorState={setEditorState} />
            </Form.Group>
            <ButtonComponent 
              setShow={setShow} />
          </Form>
        </Jumbotron>
      </Modal.Body>
      </div>
    /* </Modal> */
  );
});

const ButtonComponent = memo(({ setShow }) => {
  return (
    <Form.Group className="d-flex">
      <ButtonGroup className="ml-auto">
        <Button
          type="submit"
          variant="light"
          onClick={() => setShow(false)}
          style={{ width: "5rem", marginRight: "5px" }} >
          Save</Button>
        <Button
          variant="light"
          style={{ width: "5rem" }}
          onClick={() => setShow(false)}>
          Cancel</Button>
      </ButtonGroup>
    </Form.Group>
  );
});

function mapStateToProps(state) {
  return {
    page: state.page,
    errorMessage: state.auth.errorMessage
  }
}

export default connect(mapStateToProps, actions)(FormComponent);