import React, { memo, useEffect, Fragment } from 'react';
import { Jumbotron, Modal, Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import CustomInput from '../shared/CustomInput'
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { DeleteIcon, EditIcon, CancelIcon } from '../icons';
import { isEmpty, dateTime, validate } from '../../helpers';


const HistoryForm = memo(({
  data, show, edit, onClose, onChangeEdit, //parent
  isAdmin, //store
  getHistory, createHistory, updateHistory, deleteHistory //action
}) => {
  let { historyId, title, content, year, month } = data;
  let formData = {};
  let formError = {};
  const hasData = !isEmpty(data);
  const onUpdate = edit && !isEmpty(data);
  const onCreate = edit && isEmpty(data);
  const onView = !edit;


  const handleChange = (name, value, validated) => {
    formData[name] = value;
    formError[name] = validated;
    console.log(formData, formError)
  };


  const hasErrors = (item) => {
    if (isEmpty(item)) return true;
    let correct = true;
    Object.values(item)
      .forEach(value => correct &= value);
    return !correct;
  }

  const handleCreate = async () => {
    console.log(formError);
    if (hasErrors(formError)) return;
    await createHistory(formData);
    await getHistory();
    onClose();
  }

  const handleUpdate = async () => {
    console.log(formError);
    if (hasErrors(formError)) return;
    await updateHistory({ ...formData, historyId });
    await getHistory();
    onClose();
  }

  const handleDelete = async () => {
    await deleteHistory({ historyId });
    await getHistory();
    onClose();
  }



  useEffect(() => {
    console.log(data)
  }, [data])
  return (
    <Modal size="xl" show={show} onHide={onClose} >
      <Jumbotron className="jumbotron-main">
        <div className="jumbotron-inner-frame">
          <Form noValidate >
            <Modal.Header style={{ margin: "", paddingLeft: "0px", paddingRight: "0px" }} >
              {onView && <h3>History View</h3>}
              {onUpdate && <h3>History Update</h3>}
              {onCreate && <h3>History Create</h3>}
              <MenuButtons
                edit={edit}
                isAdmin={isAdmin}
                hasData={hasData}
                onClose={onClose}
                onDelete={handleDelete}
                onChangeEdit={onChangeEdit}
              />
            </Modal.Header>
            <Modal.Body style={{ paddingBottom: "0px" }} >
              <Row style={{ paddingLeft: "0px", marginBottom: "0px" }} >
                <Col style={{ paddingLeft: "0px", paddingRight: "0px" }} >
                  <CustomInput
                    size="lg"
                    defaultValue={title}
                    name="title"
                    type="text"
                    placeholder="Title"
                    edit={edit}
                    onChange={handleChange}
                    style={{ borderRadius: "5px", padding: "4px 8px", backgroundColor: "white", borderColor: edit && hasData ? "pink" : null }}
                  />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Body style={{ padding: "5px 16px" }} >
              <Row style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", height: "55px" }}>
                <div style={{ display: "flex" }}>
                  <Form.Label style={{ paddingRight: "15px", paddingLeft: "15px", fontSize: "14px" }}>
                    Year:
                </Form.Label>
                  <div>
                    <CustomInput
                      size="lg"
                      name="year"
                      type="text"
                      edit={edit}
                      validation={validate.year}
                      onChange={handleChange}
                      defaultValue={year}
                      style={{ maxWidth: "6rem", borderRadius: "5px", padding: "4px 8px", color: "black", textAlign: "center", backgroundColor: "white" }}
                    />
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <Form.Label style={{ paddingRight: "15px", paddingLeft: "15px", fontSize: "14px" }}>
                    Month:
                </Form.Label>
                  <div>
                    <CustomInput
                      size="lg"
                      name="month"
                      type="text"
                      edit={edit}
                      validation={validate.month}
                      onChange={handleChange}
                      defaultValue={month}
                      style={{ maxWidth: "6rem", borderRadius: "5px", padding: "4px 8px", color: "black", textAlign: "center", backgroundColor: "white" }}
                    />
                  </div>
                </div>
              </Row>
            </Modal.Body>
            <hr className="my-8" />
            <Modal.Body style={{ paddingTop: "0px" }} >
              <Row>
                <CustomInput
                  size="lg"
                  name="content"
                  as="textarea"
                  type="text"
                  rows={5}
                  defaultValue={content}
                  edit={edit}
                  placeholder="Content"
                  onChange={handleChange}
                  style={{ borderRadius: "5px", padding: "4px 8px", minHeight: "5rem", backgroundColor: "white", borderColor: edit && hasData ? "pink" : null }}
                />
              </Row>
            </Modal.Body>
          </Form>
          <FormButtons
            edit={edit}
            isAdmin={isAdmin}
            hasData={hasData}
            onUpdate={handleUpdate}
            onCreate={handleCreate}
            onCancel={onClose}
          />
        </div>
      </Jumbotron>
    </Modal >
  );
});

const MenuButtons = memo(({
  edit, isAdmin, hasData,
  onClose, onDelete, onChangeEdit
}) => {
  return (
    <div className="d-flex">
      <ButtonGroup className=" d-flex ml-auto">
        {isAdmin && hasData && edit && (
          <Button
            as={Button}
            size="sm"
            variant="danger"
            onClick={onDelete}
            style={{ marginRight: "5px" }}
          >
            <DeleteIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        {isAdmin && hasData && (
          <Button
            size="sm"
            variant="light"
            active={edit}
            onClick={onChangeEdit}
            style={{ textAlign: "center", verticalAlign: "middle" }}
          >
            <EditIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        <Button
          size="sm"
          variant="light"
          onClick={onClose}
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
          <CancelIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const FormButtons = memo(({
  edit, isAdmin, hasData,
  onUpdate, onCreate, onCancel
}) => {
  return (
    <Form.Group className="d-flex">
      {isAdmin && edit && (
        <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
          {hasData ? (
            <Button
              className="btn btn-main"
              variant="light"
              onClick={onUpdate}
              style={{ hight: "1rem", width: "5rem", marginRight: "5px" }}
            >
              Update
            </Button>
          ) : (
              <Button
                className="btn btn-main"
                variant="light"
                onClick={onCreate}
                style={{ hight: "1rem", width: "5rem", marginRight: "5px" }}
              >
                Create
              </Button>
            )}
          <Button
            className="btn btn-main"
            variant="light"
            style={{ width: "5rem" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </ButtonGroup>)}
    </Form.Group>
  );
});

const mapStateToProps = (state) => {
  return {
    isAdmin: state.auth.isAdmin,
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(HistoryForm);