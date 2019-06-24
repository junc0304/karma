import React, { memo, useState, useEffect } from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import PageForm from './Form';
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
  }, [type, getPage]);

  const onSubmit = async (formData) => {
    formData.type = type;
    console.log(formData)
    if (dataExist) await updatePage(formData); 
    else await createPage(formData);
    await getPage(type);
  }

  return (
      <Jumbotron fluid style={{ wordWrap:"break-word", padding:"15px 15px" }}>
        <h1 className="display-4">
          { data.title } 
          { isAdmin && 
          <EditButton setShow={setShowForm}/> }
        </h1>
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
  );
});

const EditButton = memo(({setShow}) => {
  return(
    <div style={{position:"relative"}}>
      <Button 
        className="ml-auto" 
        variant="light" 
        onClick={()=> setShow(true)}
        style={{position:"absolute",right:"0px", bottom:"0px"}}>Edit</Button>
    </div>
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