import React, { memo } from 'react';
import { Modal, Jumbotron, Button } from 'react-bootstrap';

const ViewComponent = ({ data, show, onClose }) => {
  const { name, email, depotName, address, unit, city, phone, province, postalCode, role, created, comment } = data;

  const handleClose = () => {
    onClose();
  }

  const formatTime = (time) => {
    if (!time) return;
    let newTime = new Date(time);
    let hours = newTime.getHours();
    return `${newTime.getFullYear()}-${newTime.getMonth() + 1}-${newTime.getDate()}  ${hours % 12 === 0 ? 12 : hours % 12}:${newTime.getMinutes()} ${hours >= 12 ? "PM" : "AM"}`
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
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <div style={{ flex: "3", display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
              <div><strong>Name:</strong></div>
              <div style={{ flex: "1", paddingRight: "0px", textAlign: "center" }}>{name}</div>
            </div>
            <div style={{ flex: "2", display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
              <div><strong>Role:</strong></div>
              <div style={{ flex: "1", textAlign: "center" }}>{role}</div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <div ><strong>Email:</strong></div>
            <div style={{ flex: "1", textAlign: "center" }}> {email}</div>
          </div>

          {phone && (
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingTop:"15px"}} >
              <div><strong>Phone:</strong> </div>
              <div style={{ flex: "1", textAlign: "center" }}>{phone}</div>
            </div>
          )}
        </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }} >
            <div><strong>Depot:</strong></div>
            <div style={{ flex:"1", textAlign:"center"}}>{depotName}</div>
          </div>
        </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", paddingBottom:"15px" }}>
            {unit && (
              <div style={{ flex: "2", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                <div><strong>Unit:</strong></div>
                <div style={{ flex: "1", textAlign: "center" }}>{unit}</div>
              </div>
            )}
            <div style={{flex:"5", display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
              <div><strong>Street:</strong></div>
              <div style={{ flex: "2", textAlign: "center" }}>{address}</div>
            </div>
          </div>
        <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap" }}>
          <div style={{ flex: "2"}}> 
            <div><strong>City:</strong></div>
              <div style={{ flex: "1", textAlign: "center" }}>{city}</div>
            </div>  
          <div style={{ flex: "3" }}>
            <div><strong>Province:</strong></div>
              <div style={{ flex: "1", textAlign: "center", whiteSpace: "nowrap" }}>{province}</div>
          </div>
            <div style={{ flex: "3" }}>
        <div><strong>Postal Code:</strong></div>
      <div style={{ flex: "1", textAlign: "center" }}>{postalCode}</div>
          </div>    
  </div >

      
  </Modal.Body >
        <Modal.Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            <div><strong>Joined:</strong> </div>
            <div style={{ flex: "1", textAlign: "center" }}>{formatTime(created)}</div>
            </div>  
        </Modal.Body>  
        <Modal. Body style={{ backgroundColor: "white", borderRadius: "5px", marginBottom: "5px" }}>
          <div> 
            <div><strong>Comment:</strong></div>
            <div style={{ flex: "1"}}>{comment}</div>
          </div>
        </Modal.Body>  
        <Button className="d-flex ml-auto"
          variant="light"
          onClick={handleClose}
          style={{ marginTop: "15px" }}>
          Close</Button>
      </Jumbotron>
    </Modal>  
  )
}

export default memo(ViewComponent);