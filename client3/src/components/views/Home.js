import React, { memo, useEffect, useState } from 'react';
import { ButtonToolbar, Jumbotron, Container, Button } from 'react-bootstrap';
import Page from './Page.Components/Page';

const sampleData = {
  title: "title sample",
  heading: "heading sample",
  content: "content sample"
}
const Home = () => {
  const [data, setData] = useState([]);
  
  useEffect(()=>{
    setData(sampleData);
  },[])
  return (
    <Page 
      data= {sampleData}
      setData={setData} />
  );
}

export default Home;