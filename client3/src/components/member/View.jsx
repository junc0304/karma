import React, { useState, memo } from 'react';
import { Modal, Row, Col, Jumbotron, Button } from 'react-bootstrap';

const ViewComponent = ({ data, show, setShow }) => {
  const { name, email, depotName, address, unit, city, phone, province, postalCode, role, created, updated, comment, location, owner, contact } = data;
  const handleShow = () => {
    setShow(true);
  }

  const handleClose = () => {
    setShow(false);
  }

  const formatTime = (time) => {
    if(!time) return;
    let newTime = new Date(time);
    let hours = newTime.getHours();
    return `${newTime.getFullYear()}-${newTime.getMonth() + 1}-${newTime.getDate()}  ${hours % 12 === 0? 12:hours % 12}:${newTime.getMinutes()} ${hours >= 12?"PM":"AM"}`
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}>
      <Jumbotron style={{ padding: "15px 15px", margin: "0" }}>
        <Modal.Header style={{ borderRadius: "5px", paddingRight: "0px" }}>
          <h3>Member Info</h3>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3"><strong>Name:</strong></Col>
            <Col xs="4" sm="4" md="4" lg="4" xl="4" style={{paddingRight:"0px"}}>{name}</Col>
            <Col xs="2" sm="2" md="2" lg="2" xl="2"><strong>Role:</strong></Col>
            <Col xs="3" sm="3" md="3" lg="3" xl="3">{role}</Col>
          </Row>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3"><strong>Email:</strong></Col>
            <Col> {email}</Col>
          </Row>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3"><strong>Phone:</strong> </Col>
            <Col> {phone}</Col>
          </Row>
        </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3"><strong>Depot:</strong></Col>
            <Col> {depotName}</Col>
          </Row>
        </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            {unit &&
              <Col xs="2" sm="2" md="2" lg="2" xl="2"><strong>Unit:</strong></Col>}
            {unit &&
              <Col xs="2" sm="2" md="2" lg="2" xl="2">{unit}</Col>}
            <Col xs={unit?"2":"3"} sm={unit?"2":"3"} md="3" lg="3" xl="3"><strong>Street:</strong></Col>
            <Col xs={unit?"10":"9"} sm={unit?"10":"9"} md="auto" lg="auto" xl="auto">{address}</Col>
          </Row>
          <Row>
            <Col xs="2" sm="2" ><strong>City:</strong></Col>
            <Col xs="4" sm="4">{city}</Col>
            <Col xs="3" sm="3" ><strong>Province:</strong></Col>
            <Col xs="3" sm="3" >{province}</Col>
            <Col xs="5" sm="5"><strong>Postal Code:</strong></Col>
            <Col xs="7" sm="7" >{postalCode}</Col>
          </Row>
        </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3" ><strong>Joined:</strong> </Col>
            <Col>{formatTime(created)}</Col>
          </Row>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <Row>
            <Col xs="3" sm="3" md="3" lg="3" xl="3" ><strong>Comment:</strong></Col>
            <Col>{comment}</Col>
          </Row>
        </Modal.Body>
        <Button className="d-flex ml-auto" 
          variant="light" 
          onClick={handleClose}
          style={{marginTop:"15px"}}>
          Close</Button>
      </Jumbotron>
    </Modal>
  )
}

export default memo(ViewComponent);