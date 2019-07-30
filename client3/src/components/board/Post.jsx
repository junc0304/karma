'use strict';
import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, Modal, Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { DeleteIcon, EditIcon, CancelIcon } from '../icons';
import { isEmpty, dateTime } from '../../helpers';
import CustomInput from '../shared/CustomInput'
import CommentComponent from './Comment';
import * as actions from '../../actions';


const PostComponent = memo((props) => {
  let { data, show, onClose, editable = false, rowId, onChange, onCreate, onDelete, onUpdate, onChangeEdit} = props;
  let { postId, title, content, created, updated, authorName, comments } = data;
    return (
      <Modal
        show={show}
        onHide={onClose} >
        <Jumbotron style={{ padding: "15px 15px", margin: "0" }}>
          <Form noValidate>
            <Modal.Header style={{ borderRadius: "5px", padding: "5px 0px 16px 15px" }}>
            {/*   {onView && <h3>View post</h3>}
              {onUpdate && <h3>Update post</h3>}
              {onCreate && <h3>Create post</h3>} */}
              <MenuButtons
                edit={edit}
                hasData={hasData}
                onClose={onClose}
                onDelete={onDelete}
                show={editable}
                onChangeEdit={handleEditChange}
              />
            </Modal.Header>
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
                    style={{ verticalAlign: "middle", backgroundColor: "white", border: `2px solid ${edit && hasData ? "pink" : "white"}` }}
                  />
                </Col>
              </Row>
              {hasData && (
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
                onChange={handleChange}
                style={{
                  padding: "16px", marginTop: "10px", resize: "none", whiteSpace: "preWrap",
                  backgroundColor: "white", borderRadius: "5px", minHeight: "300px", border: `2px solid ${edit && hasData ? "pink" : "white"}`
                }}
              />
            </Modal.Body>
            {edit && (
              <FormButtons
                edit={edit}
                data={data}
                onUpdate={onUpdate}
                onCreate={onCreate}
                onCancel={onChangeEdit}
              />
            )}
          </Form>
         {/*  {!edit && (
            <CommentComponent
              edit={edit}
              postId={rowId}
            />
          )} */}
        </Jumbotron>
      </Modal>
    );
  }
});

const MenuButtons = memo(({ onClose, onDelete, onChangeEdit, hasData, edit, show }) => {
  return (
    <div className="d-flex">
      <ButtonGroup className=" d-flex ml-auto">
        {show && hasData && edit && (
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
        {show && hasData && (
          <Button
            size="sm"
            variant="light"
            active={edit}
            onClick={onChangeEdit}
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

export default BoardFormComponent