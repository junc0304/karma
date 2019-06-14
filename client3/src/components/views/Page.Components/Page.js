import React, { memo , useState} from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import EditButton from './Page.EditButton';
import PageEditForm from './Page.EditForm';

const Page = memo(({ data, setData, role = "Guest" }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <Container>
      <Jumbotron>
        {role === 'Guest' &&
          <EditButton setShow={setShowForm}/>}
        <h1 className="display-4">
          {data.title}</h1>
        <hr className="my-4" />
        <Container>
          <p className="lead">
            {data.heading}</p>
          <p className="kr">
            {data.content}</p>
        </Container>
        <PageEditForm
          data={data}
          setData={setData}
          show={showForm}
          setShow={setShowForm}/>
      </Jumbotron>
    </Container>
  );
}
);
export default Page;