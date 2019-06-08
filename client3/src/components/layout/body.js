import React from 'react';
import { Container } from 'react-bootstrap';

const style={
  padding:"10%",
  minHeight: "100%"
}
const Body = ({ children }) => {
  return (
    <Container fluid style={style}>
      {children}
    </Container>
  );
}

export default Body;