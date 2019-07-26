import React, { useState, useEffect, useContext, Fragment, memo } from 'react';
import { Col, Form, Jumbotron, Row, Modal, ButtonGroup, Button } from 'react-bootstrap';
import { HistoryContext } from './HistoryContext.jsx';
import { TrashIcon, EditIcon, ExIcon } from '../icons';
const _ = require('lodash');

const MenuButtonsComponent = memo(({ onClose, onDelete, onModeChange, edit }) => {
  const { isAdmin } = useContext(HistoryContext);
  return (
    <div className="d-flex">
      <ButtonGroup className=" d-flex ml-auto">
        {isAdmin && edit && (
          <Button
            size="sm"
            variant="danger"
            onClick={onDelete}
            style={{ marginRight: "5px" }}
          >
            <TrashIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        {isAdmin && (
          <Button
            size="sm"
            variant="light"
            active={edit}
            onClick={onModeChange}
          >
            <EditIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
          </Button>
        )}
        <Button
          size="sm"
          variant="light"
          onClick={onClose}
        >
          <ExIcon style={{ textAlign: "center", verticalAlign: "middle" }} />
        </Button>
      </ButtonGroup>
    </div>
  );
});

const FormComponent = memo(({ data, show, onClose, onSubmit, onDelete }) => {

  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchData = ()=> {}
    fetchData();
  },[]);
  
  useEffect(() => setFormData(data), [data]);

  const setFormDataDebounced = _.debounce((name, value) => setFormData({ ...formData, [name]: value }), 300);
  const handleChange = (event) => setFormDataDebounced(event.target.name, event.target.value);
  const handleSubmit = (event) => [event.preventDefault(), onSubmit(formData)];
  const handleDelete = () => onDelete();
  const handleModeChange = () => setEditMode(!editMode);
  const createYearArray = () => {
    let arrYear = [];
    let thisYear = new Date().getFullYear();
    for (let i = thisYear; i > thisYear - 60; i--) {
      arrYear.push(<option value={i} key={`year-${i}`}>{i}</option>);
    }
    return arrYear;
  }
  const createMonthArray = () => {
    let arrMonth = [];
    for (let i = 1; i <= 12; i++) {
      arrMonth.push(<option value={i} key={`month-${i}`}>{i}</option>);
    }
    return arrMonth;
  }
  const formDate = (year, month) => {
    return `${year}-${month}`
  }
  return (
    <Modal
      centered
      show={show}
      onHide={onClose}
    >
      <Jumbotron style={{ margin: "0px", padding: "16px" }} >
        <Form
          onSubmit={handleSubmit}
        >
          <Modal.Header style={{ margin: "", paddingRight: "0px" }} >
            <h3>View History</h3>
            {/* closeModal, deleteRow, editRow, onEditMode */}
            <MenuButtonsComponent
              edit={editMode}
              onClose={onClose}
              onDelete={handleDelete}
              onModeChange={handleModeChange}
            />
          </Modal.Header>
          <Modal.Body style={{ paddingBottom: "0px" }} >
            <Row style={{ paddingLeft: "0px", marginBottom: "0px" }} >
              <Col style={{ paddingLeft: "0px", paddingRight: "0px" }} >
                <Form.Control
                  name="title"
                  type="text"
                  placeholder="Title"
                  defaultValue={formData.title}
                  readOnly={!editMode}
                  disabled={!editMode}
                  plaintext={!editMode}
                  onChange={handleChange}
                  style={{ borderRadius: "5px", padding: "4px 8px", backgroundColor: "white" }}
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Body style={{ padding: "5px 16px" }} >
            <Row style={{ paddingLeft: "0px", marginBottom: "0px" }}
            >
              {!editMode ? (
                <div>{formDate(formData.year, formData.month)}</div>) : (
                  <Fragment>
                    <Form.Label
                      as={Col}
                      style={{ paddingLeft: "15px", fontSize: "14px" }}
                    >
                      Year:
                    </Form.Label>
                    <Col style={{ paddingRight: "0px" }}>
                      <Form.Control
                        as="select"
                        name="year"
                        type="text"
                        readOnly={!editMode}
                        disabled={!editMode}
                        plaintext={!editMode}
                        onChange={handleChange}
                        defaultValue={-1}
                        style={{ borderRadius: "5px", padding: "4px 8px", color: "black", textAlign: "center", backgroundColor: "white" }}
                      >
                        <option value={-1} disabled >{formData.year}</option>
                        {createYearArray(formData.year)}
                      </Form.Control>
                    </Col>
                    <Form.Label
                      as={Col}
                      style={{ paddingLeft: "15px", fontSize: "14px" }}
                    >
                      Month:
                    </Form.Label> {/*replace with ICON?*/}
                    <Col style={{ paddingRight: "0px" }}>

                      <Form.Control
                        as="select"
                        name="month"
                        type="text"
                        readOnly={!editMode}
                        disabled={!editMode}
                        plaintext={!editMode}
                        defaultValue={-1}
                        onChange={handleChange}
                        style={{ borderRadius: "5px", padding: "4px 8px", textAlign: "center", backgroundColor: "white", }}
                      >
                        <option value={-1} disabled >{formData.month}</option>
                        {createMonthArray()}
                      </Form.Control>
                    </Col>
                  </Fragment>
                )}
            </Row>
          </Modal.Body>
          <hr className="my-8" />
          <Modal.Body style={{ paddingTop: "0px" }} >
            <Row>
              <Form.Control
                name="content"
                type="text"
                rows={8}
                defaultValue={formData.content}
                readOnly={!editMode}
                disabled={!editMode}
                plaintext={!editMode}
                onChange={handleChange}
                style={{ borderRadius: "5px", padding: "4px 8px", minHeight: "5rem", backgroundColor: "white", borderColor: !editMode ? null : "pink" }}
              />
            </Row>
          </Modal.Body>
        </Form>
      </Jumbotron>
    </Modal>
  );
});

export default FormComponent;