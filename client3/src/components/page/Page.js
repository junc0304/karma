import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import EditButton from './Page.EditButton';
import PageForm from './Page.Form';
import { connect } from 'react-redux';
import { USER_TYPE } from '../../config';
import * as actions from '../../actions'

const Page = memo(({getPage, updatePage, createPage, type, role = "ADMIN", page:{data} }) => {

  const isAdmin = role === USER_TYPE.ADMIN;
  const dataExist = data? true: false;
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchData = async () => await getPage(type);
    fetchData();
  }, [type]);

  const onSubmit = async (formData) => {
    formData.type = type;
    console.log(formData)
    if (dataExist) await updatePage(formData); 
    else await createPage(formData);
    await getPage(type);
  }

  return (
    <Container>
      <Jumbotron style={{ wordWrap:"break-word" }}>
        <h1 className="display-4">
          {data.title} 
          {isAdmin &&
            <EditButton setShow={setShowForm} />}</h1>
        <hr className="my-4"/>
        <Container>
          <p className="kr">
            {data.content}</p>
        </Container>
        {isAdmin &&
          <PageForm
            type={type}
            data={data}
            show={showForm}
            setShow={setShowForm}
            onSubmit={onSubmit} />}
      </Jumbotron>
    </Container>
  );
});

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    user: state.user,
    page: state.page,
    errorMessage: state.errorMessage
  };
}

export default connect(mapStateToProps, actions)(Page);