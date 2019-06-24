import React from 'react';
import {Container, Jumbotron, Modal, Form} from 'react-bootstrap';


const PollComponent = () => {
  return (
    <Jumbotron>




    </Jumbotron>
  );
}

const PollPage = () => {

}

const PollItem = ({ id, group, label }) => {
  return (
    <Form.Check
      id={id}
      type={radio}
      label={label}
      name={group} />
  );
}

const PollGroup = ({data}) => {
  return (
    <Form>
      <Form.Group>
      <Form.Label>
        {data.title}</Form.Label>
      { data.map((item, index) =>
          <PollItem id={index} label={item.label} name={item.group} />
        )}
      </Form.Group>
    </Form>
  )


}

const PollForm = () => {
 
  const [editMode, setEditMode] = useState(false);
  var pollList = [];
  const addItem = () => {
    
  }

  return(
    <Modal>
      <Jumbotron>
        <Button onClick={addItem}>
          {"+"}</Button>
        <Form>
          <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            disabled={!editMode}/>
          </Form.Group>

          <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            disabled={!editMode}/>
          </Form.Group>
        </Form>

        <Form>
          <Form.Control
            name="number"
            type="text" />
          <Form.Control
            name="title"
            type="text" />
        </Form>

      </Jumbotron>
    </Modal>
  )
}


export default PollComponent