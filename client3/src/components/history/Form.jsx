import React, { memo, useState, useEffect, Fragment, useContext } from 'react';
import { Jumbotron, Modal, Form, ButtonGroup, Button, Row, Col } from 'react-bootstrap';
import { HistoryContext } from './HistoryContext.jsx';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { DeleteIcon, EditIcon, CancelIcon } from '../icons';
import { isEmpty, dateTime } from '../../helpers/index.js';
import CustomInput from '../shared/CustomInput'

const HistoryForm = memo(({
  data, show, isAdmin,
  onClose, createHistory, updateHistory, deleteHistory }) => {

  let formData = {};

  //View Component
  const FormView = () => {

    const [edit, setEdit] = useState(false);
    useEffect(() => setEdit(isEmpty(data)), []);

    const hasData = !isEmpty(data);
    const onUpdate = edit && !isEmpty(data);
    const onCreate = edit && isEmpty(data);
    const onView = !edit;

    const handleChange = (name, value, validated) => {
      console.log(formData)
      formData[name] = value;
    }
    const handleCreate = async () => [await createHistory(formData), await actions.getHistory()];
    const handleUpdate = async () => await updateHistory(formData);
    const handleDelete = async () => await deleteHistory(formData);
    const handleEditChange = () => setEdit(!edit);

    return (
      <Modal size="xl" show={show} onHide={onClose} >
        <Jumbotron style={{ margin: "0px", padding: "16px" }} >
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
                onChangeEdit={handleEditChange}
              />
            </Modal.Header>
            <Modal.Body style={{ paddingBottom: "0px" }} >
              <Row style={{ paddingLeft: "0px", marginBottom: "0px" }} >
                <Col style={{ paddingLeft: "0px", paddingRight: "0px" }} >
                  <CustomInput
                    defaultValue={data.title}
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
              <Row style={{ paddingLeft: "0px", marginBottom: "0px" }}
              >
                <Fragment>
                  <Form.Label
                    as={Col}
                    style={{ paddingLeft: "15px", fontSize: "14px" }}
                  >
                    Year:
                      </Form.Label>
                  <Col style={{ paddingRight: "0px" }}>
                    <CustomInput
                      as="select"
                      name="year"
                      type="text"
                      edit={edit}
                      onChange={handleChange}
                      defaultValue={data.year || -1}
                      style={{ borderRadius: "5px", padding: "4px 8px", color: "black", textAlign: "center", backgroundColor: "white" }}
                    >
                      <option value={-1} disabled >{formData.year}</option>
                      <YearOptions />
                    </CustomInput>
                  </Col>
                  <Form.Label
                    as={Col}
                    style={{ paddingLeft: "15px", fontSize: "14px" }}
                  >
                    Month:
                      </Form.Label> {/*replace with ICON?*/}
                  <Col style={{ paddingRight: "0px" }}>
                    <CustomInput
                      as="select"
                      name="month"
                      type="text"
                      edit={edit}
                      onChange={handleChange}
                      defaultValue={data.month || -1}
                      style={{ borderRadius: "5px", padding: "4px 8px", color: "black", textAlign: "center", backgroundColor: "white" }}
                    >
                      <option value={-1} disabled >{formData.month}</option>
                      < MonthOptions />
                    </CustomInput>
                  </Col>
                </Fragment>
              </Row>
            </Modal.Body>
            <hr className="my-8" />
            <Modal.Body style={{ paddingTop: "0px" }} >
              <Row>
                <CustomInput
                  name="content"
                  as="textarea"
                  type="text"
                  rows={5}
                  defaultValue={data.content}
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
            hasData={hasData}
            onSave={handleUpdate}
            onCreate={handleCreate}
            onCancel={onClose}
          />
        </Jumbotron>
      </Modal >
    );
  }
  return <FormView />
});

const MenuButtons = memo(({ onClose, onDelete, onChangeEdit, hasData, edit, isAdmin }) => {
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

const FormButtons = memo(({ onUpdate, onCreate, onCancel, edit, hasData }) => {
  const { isAdmin } = useContext(HistoryContext);
  return (
    <Form.Group className="d-flex">
      {isAdmin && edit && (
        <ButtonGroup className="ml-auto" style={{ marginTop: "15px" }}>
          {hasData ? (
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

const YearOptions = () => {
  let years = dateTime.arrYears(50);
  return (
    <Fragment>
      {years.map((item, index) =>
        <option value={item} key={`year-${index}`}>{item}</option>
      )}
    </Fragment>
  );
}

const MonthOptions = () => {
  let months = dateTime.arrMonths;
  return (
    <Fragment>
      {months.map((item, index) =>
        <option value={item} key={`year-${index}`}>{item}</option>
      )}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user
  };
}

export default connect(mapStateToProps, actions)(HistoryForm);